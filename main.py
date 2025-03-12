from fastapi import FastAPI, Request, HTTPException, Depends, status, Form, Cookie
from fastapi.templating import Jinja2Templates
from fastapi.security import HTTPBasic
from fastapi.responses import Response, RedirectResponse, HTMLResponse

from sqlalchemy.orm import Session
from sqlalchemy import select
from decimal import Decimal
from schemas import LoginUser, RegisterUser
from database import SessionLocal
from models import User, Film
from work_with_user import check_user_in_DB, register_user, update_user_profile, UserNotFound, UsernameAlreadyExistsError, EmailAlreadyExistsError
from work_with_films import add_film, FilmInDB, get_top_films, get_all_movie_info, FilmNotFound


app = FastAPI()
templates = Jinja2Templates(directory="templates")
security = HTTPBasic()

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

@app.get("/")
async def index_page(request: Request, user_id: str | None = Cookie(default=None)):
    if user_id:
        try:
            # написать функцию для проверки user_id
            db = SessionLocal()
            user = db.execute(
                select(User).where(User.id == int(user_id))
            ).scalar()
            if user:
                return templates.TemplateResponse("index_auth.html", {"request": request, "user": user})
        
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"Произошла ошибка {e}")
        
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/login")
async def index_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/register")
async def index_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@app.post("/login")
async def login_post(
    request: Request,
    email: str = Form(...),
    password: str = Form(...)):
    try:
        login_data = LoginUser(email=email, password=password)
        user = check_user_in_DB(login_data.email, login_data.password)
        response = RedirectResponse(url="/", 
                                status_code=status.HTTP_303_SEE_OTHER)
        response.set_cookie(key="user_id", value=str(user.id))
        return response
    
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail="Неверный email или пароль")

@app.post("/register")
async def register_post(request: Request,
                        username: str = Form(...),
                        email: str = Form(...),
                        password:str = Form(...),
                        db: Session = Depends(get_db)):
    try:
        register_data = RegisterUser(email=email, username=username, password=password)
        new_user = register_user(register_data.username, register_data.email, register_data.password)
        response = RedirectResponse(url="/",
                                    status_code=status.HTTP_303_SEE_OTHER)
        response.set_cookie(key="user_id", value=str(new_user.id))
        return response

    except EmailAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Пользователь с таким email уже существует"
        )
    
    except UsernameAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким именем уже существует"
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Возникла ошибка при регистарации: {str(e)}"
        )
    

@app.get("/users/{user_id}")
async def get_user_profile(request: Request, user_id: int):
    if user_id:
        try:
            db = SessionLocal()
            user = db.execute(
                select(User).where(User.id == int(user_id))
            ).scalar()
            if not user:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                                    detail=f"Пользователь не авторизован. Ошибка {e}")
            print(user.about_user)
            return templates.TemplateResponse("user.html", {"request": request, "user": user})
        
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"Произошла ошибка {e}")
        
        finally:
            db.close()
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                             detail="Пользователь не авторизован")
    

@app.get("/users/{user_id}/settings")
async def get_user_settings(request: Request,
                            user_id: int):
    if user_id:
        try:
            db = SessionLocal()
            user = db.execute(
                select(User).where(User.id == user_id)
            ).scalar()
            if not user:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                    detail=f"Пользователь не авторизован")
            
            return templates.TemplateResponse("settings.html", {"request": request, "user": user})
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"произошла ошибка {e}")
        finally:
            db.close()


@app.post("/users/{user_id}/settings")
async def update_user_settings(request: Request,
                               user_id: int,
                               username: str = Form(...),
                               email: str = Form(...),
                               new_password: str | None = Form(default=""),
                               about_user: str | None = Form(default="")):
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail="Пользователь не авторизован")
    
    try:
        update_user = update_user_profile(user_id=user_id,
                                          username=username,
                                          email=email,
                                          password=new_password if new_password else None,
                                          about_user=about_user)
        return RedirectResponse(url=f"/users/{user_id}/settings", 
                                status_code=status.HTTP_303_SEE_OTHER)
    
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Пользователь не найден")
    
    except UsernameAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, 
                            detail="Пользователь с таким username уже существует")
    
    except EmailAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Пользователь с таким email уже существует")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")
    

@app.post("/users/{user_id}/delete")
async def delete_user(request: Request,
                      user_id: int):
    if user_id:
        try:
            db = SessionLocal()
            user = db.execute(
                select(User).where(User.id == user_id)
            ).scalar()
            if not user:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail=f"Пользователь не найден")
            db.delete(user)
            db.commit()
            return RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                                detail=f"Произошла непредвиденная ошибка {e}")
        finally:
            db.clsoe()


@app.get("/films/add")
async def new_film_page(request: Request):
    return templates.TemplateResponse("add_film.html", {"request": request})


@app.post("/films/add")
async def add_new_film(request: Request,
                       name: str = Form(...),
                       about_film: str = Form(default=""),
                       time: int = Form(...),
                       premiere: bool = Form(default=False)):
    try:
        new_film = add_film(name=name,
                            about_film=about_film,
                            time=time,
                            premiere=premiere)
        return RedirectResponse(url="/films/add", status_code=status.HTTP_303_SEE_OTHER)
    except FilmInDB:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Фильм с таким названием уже существует")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непридведенная ошибка {e}")
    
# @app.get("/image", response_class=HTMLResponse)
# async def get_image(request: Request):
#     image_url = "https://image.openmoviedb.com/kinopoisk-images/1599028/0b76b2a2-d1c7-4f04-a284-80ff7bb709a4/orig"
    
#     # Если нужно получить изображение через requests, можно сделать так:
#     # response = requests.get(image_url)
#     # image_data = response.content
    
#     # Но в данном случае мы просто передаем URL изображения в шаблон
#     return templates.TemplateResponse("test.html", {"request": request, "image_url": image_url})


@app.get("/top_films")
async def top_films(request: Request, user_id: str | None = Cookie(default=None)):
    movies = get_top_films()
    # print(movies)
    if user_id:
        try:
            # написать функцию для проверки user_id
            db = SessionLocal()
            user = db.execute(
                select(User).where(User.id == int(user_id))
            ).scalar()
            if user:
                return templates.TemplateResponse("top_films_auth.html", {"request": request, "movies": movies})
        
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"Произошла ошибка {e}")
        
    return templates.TemplateResponse("top_films.html", {"request": request, "movies": movies})


@app.get("/films/{film_id}")
async def get_film_id(request: Request, film_id: int, user_id: str | None = Cookie(default=None)):
    if film_id:
        try:
            db: Session = SessionLocal()
            movie = get_all_movie_info(film_id)
            if movie:
                return templates.TemplateResponse("film.html", {"request": request, "film": movie})
            
        except FilmNotFound:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Фильм не найден")
        
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"Произошла ошибка {e}")
        