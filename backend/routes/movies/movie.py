from fastapi import APIRouter, status, HTTPException, Depends, Response, Query
from sqlalchemy.orm import Session
from typing import Annotated, Optional

from ...database import get_db
from ...services.movies.movie_logic import getMovieInfo
from ...services.movies.top_movies_loader import getTopMovies
from ...services.errors.movie import MovieNotFound, GigaChatAnswerError, UnauthorizedKinoPoiskAPI, ForbiddenKinoPoiskAPI
from ...schemas.movie import MovieInfo, ListMovieInfo, FindMovie
from ...services.movies.premieres import get_cinema, get_planned_movies, get_top_cinema
from ...services.movies.giga import generate_summary_gigachat
from ...services.movies.find_movie import findMovie

movie_router = APIRouter(prefix="/api/movies", tags=["Movies"])


@movie_router.get("/top_cinema_movie", response_model=MovieInfo)
async def getTopCinemaMovieRightNow(
    db: Session = Depends(get_db)
) -> MovieInfo:
    try:
        if not (movie := get_top_cinema(db=db)):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Фильм не найден"
            )
        return movie
    
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

@movie_router.get("/cinema_movies", response_model=list[ListMovieInfo])
async def getCinemaMovies(
    count: Annotated[
        int, Query(
            ge=9,
            le=51,
            example=20
        )
    ] = 30,
    db: Session = Depends(get_db),
    start_page: bool = False,
) -> list[ListMovieInfo]:
    try:
        movies = get_cinema(db=db, exclude_top=start_page, count=count)
        if not movies:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Фильмы не найдены"
            )
        return movies[:count]
    
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


@movie_router.get("/planned_movies", response_model=list[ListMovieInfo])
async def getPlannedMovies(
    count: Annotated[
        int, Query(
            ge=9,
            le=51,
            example=20
        )
    ] = 30,
    db: Session = Depends(get_db),
) -> list[ListMovieInfo]:
    try:
        movies = get_planned_movies(db=db, count=count)
        if not movies:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Фильмы не найдены"
            )
        return movies[:count]

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

@movie_router.get("/{movie_id}", response_model=MovieInfo)
async def get_movie(
    movie_id: int, 
    db: Session = Depends(get_db)
) -> MovieInfo:
    try:
        movie = getMovieInfo(kp_id=movie_id, db=db, schema_type=MovieInfo)
        movie.shortDescription = generate_summary_gigachat(movie)
        return movie
    
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

@movie_router.get("/top/", response_model=list[ListMovieInfo])
async def get_top(
        count: Annotated[
        int, 
        Query(
            ge=1, 
            le=200,
            example=10
        )
    ] = 10,
    db: Session = Depends(get_db)
) -> list[ListMovieInfo]:
    try:
        if not (movies := getTopMovies(db=db, count=count)):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No movies found"
            )
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


@movie_router.get("/find_movies/", response_model=list[ListMovieInfo])
async def getFindMovies(
    movie_name: Optional[str] = Query(None, description="Название фильма"),
    year_start: Optional[int] = Query(None, ge=1850, le=2100, description="Начальный год выпуска"),
    year_end: Optional[int] = Query(None, ge=1850, le=2100, description="Конечный год выпуска"),
    rating_kp_start: Optional[float] = Query(None, ge=0, le=10, description="Минимальный рейтинг КП"),
    rating_kp_end: Optional[float] = Query(None, ge=0, le=10, description="Максимальный рейтинг КП"),
    votes_start: Optional[int] = Query(None, ge=0, le=10_000_000, description="Минимальное количество голосов"),
    votes_end: Optional[int] = Query(None, ge=0, le=10_000_000, description="Максимальное количество голосов"),
    length_min: Optional[int] = Query(None, ge=0, le=500_000, description="Минимальная длительность (мин)"),
    length_max: Optional[int] = Query(None, ge=0, le=500_000, description="Максимальная длительность (мин)"),
    ageRating_min: Optional[int] = Query(None, ge=0, le=115, description="Минимальный возрастной рейтинг"),
    ageRating_max: Optional[int] = Query(None, ge=0, le=115, description="Максимальный возрастной рейтинг"),
    genres: Optional[list[str]] = Query(None, description="Жанры"),
    countries: Optional[list[str]] = Query(None, description="Страны"),
    db: Session = Depends(get_db)
) -> list[ListMovieInfo]:
    try:
        find_settings = FindMovie(
            movie_name=movie_name,
            year_start=year_start,
            year_end=year_end,
            rating_kp_start=rating_kp_start,
            rating_kp_end=rating_kp_end,
            votes_start=votes_start,
            votes_end=votes_end,
            length_min=length_min,
            length_max=length_max,
            ageRating_min=ageRating_min,
            ageRating_max=ageRating_max,
            genres=genres,
            countries=countries
        )
        
        res = findMovie(find_settings, db=db)
        return res
        
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