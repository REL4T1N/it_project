from fastapi import APIRouter, Depends, Cookie, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional


from ...database import get_db
from ...schemas.movie import ListMovieInfo
from ...schemas.user import UserRecommendation
from ...services.movies.rec_movies import addUserGenres, userRecommendation, genresList, rec_by_llm
from ...schemas.movie import UpdateGenresRequest
from ...services.errors.user import UserNotFound
from ...services.errors.movie import GenresCountError, MovieNotFound, GigaChatAnswerError, UnauthorizedKinoPoiskAPI, ForbiddenKinoPoiskAPI


rec_router = APIRouter(prefix="/api/recommendations", tags=["Recommendations"])

@rec_router.get("/me", response_model=list[ListMovieInfo])
async def getUserRec(
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    db: Session = Depends(get_db)
) -> list[ListMovieInfo]:
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизоване")
    try:
        movies = userRecommendation(user_id=user_id, db=db, N=20)
        if not movies:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Рекомендации не получилось сформировать")
        return movies
    
    except UnauthorizedKinoPoiskAPI:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Нет токена KinoPoiskAPI")
    
    except ForbiddenKinoPoiskAPI:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Нет доступа к токену KinoPoiskAPI или достигнут лимит")
    
    except MovieNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Фильм не найден")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")
    

@rec_router.get("/choose_genres")
async def getGenres(db: Session = Depends(get_db)):
    try:
        genres = genresList(db=db)
        if not genres:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Жанры не найдены")
        
        return genres
       
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@rec_router.post("/me/genres")
async def setUserGenres(
    request: UpdateGenresRequest,
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    db: Session = Depends(get_db)
):
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")

    try:
        answer = addUserGenres(user_id=user_id, new_genres=request.genres, db=db)
        if answer:
            return {"message": "Жанры добавлены"}
        return {"message": "Жанры не добавлены"}

    except GenresCountError as e:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail=e)
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@rec_router.get("/giga", response_model=list[ListMovieInfo])
async def gigaRec(
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    db: Session = Depends(get_db)
) -> list[ListMovieInfo]:
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")
    try:
        movies = rec_by_llm(user_id=user_id, db=db)
        if not movies:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Рекомендации не сформированы")
        return movies
    
    except UnauthorizedKinoPoiskAPI:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Нет токена KinoPoiskAPI")
    
    except ForbiddenKinoPoiskAPI:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="Нет доступа к токену KinoPoiskAPI или достигнут лимит")
    
    except MovieNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Фильм не найден")
    
    except GigaChatAnswerError:
        raise HTTPException(status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                            detail="Нет ответа от GigaChat")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")