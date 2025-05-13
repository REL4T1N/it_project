import os
import csv
from sqlalchemy.orm import Session
from .movie_logic import getMovieInfo
from ...schemas import TopMovieInfo


def process_movie_entry(entry, db):
    movie = getMovieInfo(int(entry["id"]), db, TopMovieInfo)
    movie.rating_kp = float(entry["bayesian_rating"])
    return movie


def getTopMovies(db: Session, count: int = 10) -> list:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_dir, 'top_movies.csv')
    
    with open(file_path, "r", encoding="utf-8") as file:
        movies = list(csv.DictReader(file, delimiter=";"))
    
    return [
        process_movie_entry(movies[i], db)
        for i in range(min(count, len(movies)))
    ]