from fastapi import APIRouter, status, HTTPException, Depends, Response, Query
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import BaseModel

from ...database import get_db
from ...services.movies.movie_logic import getMovieInfo
from ...services.movies.top_movies_loader import getTopMovies
from ...services.errors.movie import MovieNotFound, Unauthorized, Forbidden
from ...schemas.movie import MovieInfo, ListMovieInfo
from ...services.movies.premieres import get_cinema, get_planned_movies, get_top_cinema
from ...services.movies.giga import generate_extended_description

movie_router = APIRouter(prefix="/api/movies", tags=["Movies"])

def handle_service_exceptions(func):
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except MovieNotFound:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Movie not found"
            )
        except Unauthorized:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid API key"
            )
        except Forbidden:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="API key limit exceeded"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error"
            )
    return wrapper


@movie_router.get("/top_cinema_movie", response_model=MovieInfo)
async def getTopCinemaMovieRightNow(
    db: Session = Depends(get_db)
) -> MovieInfo:
    if not (movie := get_top_cinema(db=db)):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Фильм не найден"
        )
    return movie


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
    movies = get_cinema(db=db, exclude_top=start_page, count=count)
    if not movies:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Фильмы не найдены"
        )
    return movies[:count]


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
    movies = get_planned_movies(db=db, count=count)
    if not movies:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Фильмы не найдены"
        )
    return movies[:count]


@movie_router.get("/{movie_id}", response_model=MovieInfo)
async def get_movie(
    movie_id: int, 
    db: Session = Depends(get_db)
) -> MovieInfo:
    """
    Get full movie information by Kinopoisk ID
    """
    movie = getMovieInfo(kp_id=movie_id, db=db, schema_type=MovieInfo)
    movie.shortDescription = generate_extended_description(movie)
    return movie


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
    """
    Get top movies with pagination
    - **count**: Number of movies to return (1-200)
    """
    if not (movies := getTopMovies(db=db, count=count)):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No movies found"
        )
    return movies
