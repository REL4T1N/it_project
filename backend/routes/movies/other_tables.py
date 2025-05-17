from fastapi import APIRouter, Depends, status, HTTPException, Cookie
from sqlalchemy.orm import Session
from typing import Optional

from ...database import get_db
from ...services.movies.fav_watch_and_ed import checkMovieInTable, addMovieToTable, deleteMovieFromTable, allUserMovieInTable, updateUserSimilarMovies
from ...schemas.movie import ListMovieInfo
from ...models import FavoriteList, WatchedMovies, WatchList
from ...services.errors.movie import MovieAlreadyExistInTable, MovieNotFoundInTable

other_tables_router = APIRouter(prefix="/api", tags=["Tables"])

# ПОТОМ перенести этот обработчик в user
@other_tables_router.get("/tables/{table_name}", response_model=list[ListMovieInfo])
async def usersMovieInTable(
    table_name: str,
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    # user_id: int,
    db: Session = Depends(get_db)
) -> list[ListMovieInfo]:
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")
    
    try:
        return allUserMovieInTable(table_name, user_id, db)

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@other_tables_router.get("/{movie_id}/{table_name}")
async def getTable(
    movie_id: int,
    table_name: str,
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    # user_id: int,
    db: Session = Depends(get_db)
) -> dict:
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")
    try:
        if table_name == "favorite_movies":
            if check := checkMovieInTable(FavoriteList, user_id, movie_id, db):
                return {"message": "Фильм в избранном"}
            return {"message": "Фильма нет в избранном"}
        elif table_name == "watched_movies":
            if check := checkMovieInTable(WatchedMovies, user_id, movie_id, db):
                return {"message": 'Фильм в категории "Просмотренно"'}
            return {"message": 'Фильма нет в категории "Просмотернно"'}
        elif table_name == "watch_list_movies":
            if check := checkMovieInTable(WatchList, user_id, movie_id, db):
                return {"message": 'Фильм в категории "Буду смотреть"'}
            return {"message": 'Фильма нет в категории "Буду смотреть"'}    
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Не правильынй запрос, такой таблицы не существует")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@other_tables_router.post("/{movie_id}/{table_name}")
async def postMovieToTable(
    movie_id: int,
    table_name: str,
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    # user_id: int,
    db: Session = Depends(get_db)
):
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")
    try:
        if table_name == "favorite_movies":
            if check := addMovieToTable(FavoriteList, user_id, movie_id, db):
                return {"message": "Фильм добавлен в избранное"}
            return {"message": "Фильма не добавлен в избранное"}
        elif table_name == "watched_movies":
            if check := addMovieToTable(WatchedMovies, user_id, movie_id, db):
                if updateUserSimilarMovies(user_id=user_id, kp_id=movie_id, db=db):
                    return {"message": 'Фильм  добавлен в категорию "Просмотренно"'}
            return {"message": 'Фильма не добавлен в категорию "Просмотернно"'}
        elif table_name == "watch_list_movies":
            if check := addMovieToTable(WatchList, user_id, movie_id, db):
                if updateUserSimilarMovies(user_id=user_id, kp_id=movie_id, db=db):
                    return {"message": 'Фильм добавлен в категорию "Буду смотреть"'}
            return {"message": 'Фильма не добавлен в категорию "Буду смотреть"'}    
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Не правильынй запрос, такой таблицы не существует")

    except MovieAlreadyExistInTable:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Фильм уже в данной категории")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@other_tables_router.delete("/{movie_id}/{table_name}")
async def deleteMovieToTable(
    movie_id: int,
    table_name: str,
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    # user_id: int,
    db: Session = Depends(get_db)
):
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")
    try:
        if table_name == "favorite_movies":
            if check := deleteMovieFromTable(FavoriteList, user_id, movie_id, db):
                return {"message": "Фильм удален из избранного"}
            return {"message": "Фильма не удален из избранного"}
        elif table_name == "watched_movies":
            if check := deleteMovieFromTable(WatchedMovies, user_id, movie_id, db):
                return {"message": 'Фильм удален из категории "Просмотренно"'}
            return {"message": 'Фильма не удален из категории "Просмотернно"'}
        elif table_name == "watch_list_movies":
            if check := deleteMovieFromTable(WatchList, user_id, movie_id, db):
                return {"message": 'Фильм удален из категории "Буду смотреть"'}
            return {"message": 'Фильма не удален из категории "Буду смотреть"'}    
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Не правильынй запрос, такой таблицы не существует")

    except MovieNotFoundInTable:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Фильм не найден в данной категории")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")



