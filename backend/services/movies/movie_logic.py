from sqlalchemy.orm import Session
from typing import Type
from pydantic import BaseModel

from .movie_repository import checkMovieInDB, addMovie
from .kinopoisk_client import getApiMovie
from ..errors.movie import MovieNotFound
from ...models import Movie


def getMovieData(kp_id: int, db: Session) -> Movie:
    if movie := checkMovieInDB(kp_id, db):
        return movie
    
    if movie_data := getApiMovie(kp_id):
        return addMovie(movie_data, db)


def getMovieInfo(kp_id: int, db: Session, schema_type: Type[BaseModel]) -> BaseModel:
    if movie := getMovieData(kp_id, db):
        return schema_type.model_validate(movie)
    raise MovieNotFound