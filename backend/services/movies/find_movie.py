import os
import requests
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from .movie_logic import getMovieInfo

from ...schemas.movie import FindMovie, ListMovieInfo

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path=dotenv_path)

API_token = os.getenv("API_token")
headers = {"X-API-KEY": API_token, 
           "Accept": "application/json"}


def make_range(start_pos: int | None, end_pos: int | None, min_digit: int, max_digit: int) -> str | None:
    if start_pos is not None and end_pos is not None:
        return f"{start_pos}-{end_pos}"
    elif start_pos is None and end_pos is not None:
        return f"{min_digit}-{end_pos}"
    elif start_pos is not None and end_pos is None:
        return f"{start_pos}-{max_digit}"
    return None


def findMovieForName(movie_name: str) -> list[str]:
    url = "https://api.kinopoisk.dev/v1.4/movie/search"
    params = {"page": 1, "limit": 50, "query": movie_name}
    response = requests.get(url=url, params=params, headers=headers)

    if response.status_code == 200:
        movies = response.json().get("docs", [])
        return [str(movie["id"]) for movie in movies if "id" in movie]
    return []


def findMovieWithoutName():
    pass


def findMovie(movie: FindMovie, db: Session):
    movie_ids = []
    if movie.movie_name is not None:
        movies_ids = findMovieForName(movie.movie_name)
    
    url = "https://api.kinopoisk.dev/v1.4/movie"
    params = {
        "page": 1,
        "limit": 250,
        "selectFields": ["id"],
        "notNullFields": ["id"],
        "sortField": ["rating.kp", "votes.kp"],
        "sortType": ["-1", "-1"],
        "type": "movie"
    }

    if len(movies_ids) != 0:
        params["id"] = movies_ids
    
    if year := make_range(movie.year_start, movie.year_end, 1850, 2100):
        params["year"] = year

    if rating := make_range(movie.rating_kp_start, movie.rating_kp_end, 0, 10):
        params["rating.kp"] = rating
    
    if votes := make_range(movie.votes_start, movie.votes_end, 0, 10000000):
        params["votes.kp"] = votes
    
    if length := make_range(movie.length_min, movie.length_max, 0, 500000):
        params["movieLength"] = length

    if age := make_range(movie.ageRating_min, movie.ageRating_max, 0, 115):
        params["ageRating"] = age

    if movie.genres is not None:
        params["genres.name"] = movie.genres

    if movie.countries is not None:
        params["countries.name"] = movie.countries
    
    
    validated_movies: list[ListMovieInfo] = []
    response = requests.get(url=url, params=params, headers=headers)
    if response.status_code == 200:
        movies = response.json().get("docs", [])
        for movie in movies:
            movie = getMovieInfo(movie["id"], db=db, schema_type=ListMovieInfo)
            validated_movies.append(movie)

    return validated_movies
