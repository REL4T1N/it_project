from fastapi import APIRouter, status, HTTPException, Depends, Response, Query
from sqlalchemy.orm import Session
from typing import Annotated
from pydantic import BaseModel

from ...database import get_db
from ...services.movies.errors import MovieNotFound, MovieNotFoundInDB, Unauthorized, Forbidden
from ...services.movies.movie_logic import getMovieInfo
from ...services.movies.top_movies_loader import getTopMovies

from ...schemas import MovieInfo, TopMovieInfo

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


@movie_router.get("/{movie_id}", response_model=MovieInfo)
# @handle_service_exceptions
async def get_movie(
    movie_id: int, 
    db: Session = Depends(get_db)
) -> MovieInfo:
    """
    Get full movie information by Kinopoisk ID
    """
    return getMovieInfo(kp_id=movie_id, db=db, schema_type=MovieInfo)


@movie_router.get("/top/", response_model=list[TopMovieInfo])
# @handle_service_exceptions
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
) -> list[TopMovieInfo]:
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