import requests
import os
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from ...models import User, Genre
from ..users_service import get_user_by_id, update_user
from ...schemas.user import UserRecommendation, UpdateUser
from ...schemas.movie import ListMovieInfo
from ...services.errors.user import UserNotFound

from .movie_logic import getMovieInfo

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path=dotenv_path)

API_token = os.getenv("API_token")
headers = {"X-API-KEY": API_token, 
           "Accept": "application/json"}


def getTopGenres(genres: dict) -> list:
    sorted_genres = sorted(genres.items(), key=lambda x: x[1], reverse=True)
    return sorted_genres[:3]


def calculateMovieCounts(top_3_genres, total_movies=10) -> dict:
    total_percent = sum(percentage for _, percentage in top_3_genres)
    if total_percent == 0:
        return {}
    normalized_percentages = [(genre, percentage / total_percent) for genre, percentage in top_3_genres]

    movie_counts = {}
    remaining_slots = total_movies
    for genre, norm_percent in normalized_percentages[:-1]:
        count = round(norm_percent * total_movies)
        movie_counts[genre] = count
        remaining_slots -= count
    
    last_genre = normalized_percentages[-1][0]
    movie_counts[last_genre] = remaining_slots
    
    return movie_counts


def apiFilmList(limit: int, genre: str) -> list:
    url = "https://api.kinopoisk.dev/v1.4/movie"
    params = {"limit": limit,
              "page": 1,
              "selectFields": ["id", "name", "type", "year", "ageRating","rating", 
                               "votes", "genres", "countries", "poster"
                               ],
              "notNullFields": ["id", "name", "type", "year", "ageRating", "rating.kp", 
                                "votes.kp", "genres.name", "countries.name",
                               ],
              "sortField": ["rating.kp", "votes.kp"],
              "sortType": ["-1", "-1"],
              "type": "movie",
              "genres.name": genre,
              "votes.kp": "4000-100000000000"
              }
    
    response = requests.get(url=url, params=params, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data.get("docs", [])
    return []


def progressiveRec(similar_movies: list[int], db: Session, N: int) -> list[ListMovieInfo]:
    movies: list[ListMovieInfo] = []
    for ID in similar_movies:
        movie = getMovieInfo(kp_id=ID, db=db, schema_type=ListMovieInfo)
        movies.append(movie)
    return movies[:N]


def userRecommendation(user_id: int, db: Session, N: int = 20) -> list[ListMovieInfo]:
    user = get_user_by_id(user_id=user_id, db=db, schema_type=UserRecommendation)
    if user.similar_movies is not None:
        return progressiveRec(similar_movies=user.similar_movies, db=db, N=N)

    # Получаем топ-3 жанров и стран
    user_genres = getTopGenres(user.genres)
    if not user_genres:
        # написать функцию, которая отдаст просто фильмы из какого-нибудь случайного топа
        return []
    movie_counts = calculateMovieCounts(top_3_genres=user_genres, total_movies=N)

    all_movies: list[ListMovieInfo] = []
    used_movie_ids = set()

    # Для каждого жанра выбираем страну с максимальным весом
    for genre, count in movie_counts.items():
        # Берем страну с наибольшим весом
        movies = apiFilmList(limit=count, genre=genre)
        for movie in movies:
            # if movie["id"] not in used_movie_ids:
            #     all_movies.append(ListMovieInfo.model_validate(movie))
            #     used_movie_ids.add(movie["id"])
            kp_id = movie["id"]
            if kp_id not in used_movie_ids:
                # Всегда используем getMovieInfo — он сам всё решит
                all_movies.append(getMovieInfo(kp_id=kp_id, db=db, schema_type=ListMovieInfo))
                used_movie_ids.add(kp_id)

    # Сортируем по рейтингу и выбираем топ-N
    all_movies.sort(key=lambda x: x.rating_kp, reverse=True)
    recommendations = all_movies[:N]

    return recommendations


def genresList(db: Session):
    genres = db.query(Genre.name).all()
    return [genre[0] for genre in genres]


def addUserGenres(user_id: int, new_genres: list[str], db: Session) -> bool:
    output_genres = dict()
    length_genres = len(new_genres)
    if 3 <= length_genres <= 10 and len(set(new_genres)) == length_genres:
        persentForOne = 1 / length_genres
        for genre in new_genres:
            output_genres[genre] = round(persentForOne, 2)
            if len(output_genres) == length_genres:
                break
    
    genres_data = UpdateUser(genres=output_genres)
    if user := update_user(user_id=user_id, user_data=genres_data, db=db):
        return True
    return False