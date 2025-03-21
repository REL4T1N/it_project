from fastapi import APIRouter, Depends, Cookie, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from ..services.film_service import FilmNotFound, get_film_info, get_top_films
from ..services.user_service import get_user_by_id, UserNotFound, add_film_to_favorites
from ..services.review_service import get_film_rating, get_reviews_for_film, check_review_in_db
from ..services.favorite_service import check_film_in_favorite
from ..dependencies import get_db
from ..models import Film, Review, FavoriteFilm
from ..config import templates, templates_auth


router = APIRouter()


@router.get("/top_films")
async def top_films_page(request: Request,
                         user_id: int | None = Cookie(default=None, alias="user_id"),
                         db: Session = Depends(get_db)
                         ):
    try:
        movies = get_top_films(db=db)
        user = get_user_by_id(user_id=user_id, db=db)
        if user:
            return templates_auth.TemplateResponse("top_films_auth.html", {
                "request": request, 
                "movies": movies,
                "user": user
            })
        return templates.TemplateResponse("top_films.html", {
            "request": request, 
            "movies": movies
        })
    
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Пользователь не найден")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")
    

@router.get("/films/{film_id}")
async def film_page(request: Request,
                    film_id: int,
                    user_id: int | None = Cookie(default=None, alias="user_id"),
                    db: Session = Depends(get_db)
                    ):
    try:
        '''
        Нужен функционал добавить свой отзыв на странице фильма
        '''
        film = get_film_info(film_id=film_id, db=db)
        user = get_user_by_id(user_id=user_id, db=db)
        rating = get_film_rating(film_id=film_id, db=db)
        reviews = get_reviews_for_film(film_id=film_id, db=db)

        user_review = None
        if user:
            user_review = check_review_in_db(user_id=user_id, film_id=film_id, db=db)
            return templates_auth.TemplateResponse("film_auth.html", {
                "request": request,
                "film": film,
                "rating": rating,
                "user": user,
                "reviews": reviews,
                "user_review": user_review,
            })
        return templates.TemplateResponse("film.html", {
            "request": request,
            "film": film,
            "rating": rating,
            "reviews": reviews
        })

    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Пользователь не найден")
    
    except FilmNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Фильм не найден")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")
