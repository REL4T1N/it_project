from fastapi import APIRouter, status, HTTPException, Request, Cookie, Form, Depends
from fastapi.responses import RedirectResponse, HTMLResponse

from sqlalchemy.orm import Session
from ..services.user_service import get_user_by_id, login_user, register_user, update_user, delete_user, UserNotFound, UsernameAlreadyExistsError, EmailAlreadyExistsError
from ..services.review_service import get_user_rating, get_user_reviews
from ..services.favorite_service import all_films_in_favorite
from ..services.watched_service import get_user_watched
from ..services.watchlist_service import get_user_watchlist
from ..models import User, Review
from ..database import SessionLocal
from ..config import templates, templates_auth
from ..schemas import LoginUser, RegisterUser, UpdateUser
from ..dependencies import get_db


router = APIRouter()


@router.get("/login")
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


@router.post("/login")
async def try_login(request: Request,
                     email: str = Form(...),
                     password:str = Form(...),
                     db: Session = Depends(get_db)
                     ):
    try:
        user = login_user(email=email, password=password, db=db)
        response = RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
        response.set_cookie(key="user_id", value=str(user.id))
        return response
    
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Неверный email или пароль")
    

@router.get("/register")
async def login_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})


@router.post("/register")
async def try_register(request: Request,
                       email: str = Form(...),
                       username: str = Form(...),
                       password: str = Form(...),
                       db: Session = Depends(get_db)
                       ):
    try:
        user = register_user(username=username, email=email, password=password, db=db)
        response = RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
        response.set_cookie(key="user_id", value=str(user.id))
        return response
    
    except UsernameAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Пользователь с таким именем пользователя (username) уже существует")
    
    except EmailAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, 
                            detail="Пользователь с такой почтой (email) уже существует")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")
    

@router.get("/users/{user_id}")
async def user_page(request: Request, 
                    user_id: int, 
                    cookie_user_id: int | None = Cookie(default=None, alias="user_id"),
                    db: Session = Depends(get_db)
                    ):
    '''
    Когда будет реализована работа с Reviews, нужно добавить вывод всех оценок пользователя в его профиль
    Также нужно поменять отображение профиля для пользователя с этим же куки id,
    т.е. если профиль просматривает владелец, то у него слева в виджете должен быть блок,
    в котором как минимум должны находится поля: settings, list, watchlist. 
    Эти кнопки будут открывать "/users/{user_id}/settings", "/users/{user_id}/list", 
    "/users/{user_id}/watchlist" соответственно.
    '''
    try:
        user = get_user_by_id(user_id=user_id, db=db)
        rating = get_user_rating(user_id=user_id, db=db)
        reviews = get_user_reviews(user_id=user_id, db=db)
        if cookie_user_id is None:
            return templates.TemplateResponse("user.html", {
                "request": request, 
                "user": user, 
                "rating": rating, 
                "reviews": reviews
            })
        if user_id == cookie_user_id:
            return templates_auth.TemplateResponse("your_page.html", {
                "request": request, 
                "user": user,
                "rating": rating,
                "reviews": reviews
            })
        return templates_auth.TemplateResponse("user_auth.html", {
            "request": request, 
            "user": user,
            "rating": rating,
            "reviews": reviews
        })

    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Пользователь не найден")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")
    

@router.get("/users/{user_id}/settings")
async def setting_page(request: Request, 
                       user_id: int,
                       cookie_user_id: int | None = Cookie(default=None, alias="user_id"),
                       db: Session = Depends(get_db)
                       ):
    try:
        if user_id != cookie_user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Доступ запрещён")
        user = get_user_by_id(user_id=user_id, db=db)
        return templates_auth.TemplateResponse("settings.html", {"request": request, "user": user})
    
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Пользователь не найден")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")
    

@router.post("/users/{user_id}/settings")
async def update_user_settings(request: Request,
                               user_id: int,
                               cookie_user_id: int | None = Cookie(default=None, alias="user_id"),
                               username: str = Form(...),
                               email: str = Form(...),
                               new_password: str | None = Form(default=""),
                               about_user: str | None = Form(default=""),
                               db: Session = Depends(get_db)
                               ):
    try:
        if user_id != cookie_user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Доступ запрещён")

        user = update_user(user_id=user_id, 
                           username=username,
                           email=email, 
                           password=new_password if new_password else None,
                           about_user=about_user,
                           db=db
                           )
        return RedirectResponse(url=f"/users/{user_id}/settings",
                                status_code=status.HTTP_303_SEE_OTHER)
    
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Пользователь не найден")
    
    except UsernameAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Пользователь с таким именем пользователя (username) уже существует")
    
    except EmailAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, 
                            detail="Пользователь с такой почтой (email) уже существует")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")
    

@router.post("/users/{user_id}/delete")
async def try_delete_user(request: Request,
                          user_id: int,
                          cookie_user_id: int | None = Cookie(default=None, alias="user_id"),
                          db: Session = Depends(get_db)
                          ):
    try:
        if user_id != cookie_user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Доступ запрещён")
        if delete_user(user_id, db):
            response = RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
            response.delete_cookie(key="user_id")
            return response
        
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Пользователь не найден")
    
    except Exception as e:
        raise HTTPException(status_code=status,
                            detail=f"Произошла непредвиденная ошибка {e}")
    

@router.get("/users/{user_id}/favorite")
async def user_favorites_page(request: Request,
                         user_id: int,
                         cookie_user_id: int | None = Cookie(default=None, alias="user_id"),
                         db: Session = Depends(get_db)
                         ):
    try:
        if user_id != cookie_user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Доступ запрещён")
        
        user = get_user_by_id(user_id=user_id, db=db)
        favorite_films = all_films_in_favorite(user_id=user_id, db=db)
        for film in favorite_films:
            film.bayesian_rating = round(film.bayesian_rating, 1)

        return templates_auth.TemplateResponse("favorite.html", {
            "request": request,
            "user": user,
            "films": favorite_films
        })
    
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Пользователь не найден")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")