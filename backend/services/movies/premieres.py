import requests
import os 
from dotenv import load_dotenv
from sqlalchemy.orm import Session

from .movie_logic import getMovieInfo
from ...schemas.movie import ListMovieInfo, MovieInfo
from .giga import generate_summary_gigachat
from ..errors.movie import UnauthorizedKinoPoiskAPI, ForbiddenKinoPoiskAPI, MovieNotFound

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path=dotenv_path)

API_token = os.getenv("API_token")
headers = {"X-API-KEY": API_token, 
           "Accept": "application/json"}


def calculate_bayesian_rating(rating: float, votes: int, m: float, C: float) -> float:
    return (votes * rating + m * C) / (votes + m)


def bayesianRating(movies: list[dict]) -> list[dict]:
    C = 7.0
    M = 1000

    ratings = [movie["rating"]["kp"] for movie in movies]
    if ratings:
        C = sum(ratings) / len(ratings)
    for movie in movies:
        movie["bayesian_rating"] = calculate_bayesian_rating(
            rating=movie["rating"]["kp"],
            votes=movie["votes"]["kp"],
            m=M,
            C=C
        )
    movies.sort(key=lambda x: x["bayesian_rating"], reverse=True)
    return movies


def searchMoviesInCinema(del_id: int | None = None):
    url = "https://api.kinopoisk.dev/v1.4/movie"
    params = {
        "page": 1,
        "limit": 100,
        "selectFields": [
            "id", "name", "type", "rating", "votes", "ticketsOnSale",
        ],
        "notNullFields": [
            "id", "name", "type", "year", "ageRating", "rating.kp",
            "genres.name", "countries.name", "ticketsOnSale",
        ],
        "sortField": ["rating.kp", "votes.kp"],
        "sortType": ["-1", "-1"], # -1 убывание, 1 возростание
        "type": "movie",
        "ticketsOnSale": ["true"],
        "lists": [],
    }
    if del_id is not None:
        params["id"] = [f"!{str(del_id)}"]

    response = requests.get(url=url, params=params, headers=headers)
    status = response.status_code
    if response.status_code == 200:
        data = response.json()
        return data.get("docs", [])

    elif status == 401:
        raise UnauthorizedKinoPoiskAPI
    elif status == 403:
        raise ForbiddenKinoPoiskAPI
    elif status == 404:
        raise MovieNotFound


def searchMoviesPlannedToWatch():
    url = "https://api.kinopoisk.dev/v1.4/movie"
    params = {
        "page": 1,
        "limit": 100,
        "selectFields": [
            "id", "name", "type", "year", "votes", "lists",  
        ],
        "notNullFields": [
            "id", "name", "type", "year", "ageRating", "votes.await", 
            "genres.name", "countries.name", "lists",
        ],
        "sortField": ["votes.await",],
        "sortType": ["-1",], # -1 убывание, 1 возростание
        "type": "movie",
        "lists": ["planned-to-watch-films"],
    }

    response = requests.get(url=url, params=params, headers=headers)
    status = response.status_code
    if response.status_code == 200:
        data = response.json()
        return data.get("docs", [])
    
    elif status == 401:
        raise UnauthorizedKinoPoiskAPI
    elif status == 403:
        raise ForbiddenKinoPoiskAPI
    elif status == 404:
        raise MovieNotFound
    

def searchTopCinemaMovie():
    url = "https://api.kinopoisk.dev/v1.4/movie"
    params = {
        "page": 1,
        "limit": 100,
        "selectFields": [
            "id", "name", "type", "year", "ageRating", "rating",
            "votes", "genres", "countries", "poster", "lists", 
            "ticketsOnSale"
        ],
        "notNullFields": [
            "id", "name", "type", "year", "ageRating", "rating.kp",
            "votes.kp", "genres.name", "countries.name",
            "ticketsOnSale"
        ],
        "sortField": ["rating.kp", "votes.kp"],
        "sortType": ["-1", "-1"], # -1 убывание, 1 возростание
        "type": "movie",
        "year": ["2025"],
        "ticketsOnSale": ["true"],
        "lists": [],
    }

    response = requests.get(url=url, params=params, headers=headers)
    status = response.status_code
    if response.status_code == 200:
        data = response.json()
        movies = bayesianRating(movies=data.get("docs", []))
        return movies[0]
    
    elif status == 401:
        raise UnauthorizedKinoPoiskAPI
    elif status == 403:
        raise ForbiddenKinoPoiskAPI
    elif status == 404:
        raise MovieNotFound
    

def moreMovieDescription(text: str) -> str:
    return text


def get_top_cinema(db: Session, start_page: bool = True) -> MovieInfo:
    movie = searchTopCinemaMovie()
    all_movie = getMovieInfo(kp_id=movie["id"], db=db, schema_type=MovieInfo)
    
    if start_page == True:
        all_movie.shortDescription = generate_summary_gigachat(all_movie)
    
    return all_movie


def get_cinema(db: Session, exclude_top: bool = False, count: int = 30) -> list[ListMovieInfo]:
    del_id = None
    if exclude_top:
        top_movie = get_top_cinema(db, start_page=False)
        del_id = top_movie.movie_id
    movies = searchMoviesInCinema(del_id=del_id)
    return [getMovieInfo(kp_id=movie["id"], db=db, schema_type=ListMovieInfo) for movie in movies][:count]


def get_planned_movies(db: Session, count: int = 30) -> list[ListMovieInfo]:
    movies = searchMoviesPlannedToWatch()
    return [getMovieInfo(kp_id=movie["id"], db=db, schema_type=ListMovieInfo) for movie in movies][:count]
