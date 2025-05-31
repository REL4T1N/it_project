import requests
import os
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from ...models import Genre
from ...schemas.user import UserRecommendation, UpdateUser
from ...schemas.movie import ListMovieInfo
from ...services.users.users_service import get_user_by_id, update_user
from ..errors.movie import GenresCountError

from .movie_logic import getMovieInfo
from .giga import recommend_movies_gigachat
from .fav_watch_and_ed import allUserMovieInTable

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
    all_movies: list[ListMovieInfo] = []
    user = get_user_by_id(user_id=user_id, db=db, schema_type=UserRecommendation)

    if user.similar_movies is not None:
        all_movies = progressiveRec(similar_movies=user.similar_movies, db=db, N=N)
        used_movie_ids = set(movie.kp_id for movie in all_movies)
        if len(all_movies) >= N:
            return all_movies
    else:
        used_movie_ids = set()

    user_genres = getTopGenres(user.genres)
    if not user_genres:
        return []
    movie_counts = calculateMovieCounts(top_3_genres=user_genres, total_movies=N-len(all_movies))

    for genre, count in movie_counts.items():
        movies = apiFilmList(limit=count, genre=genre)
        for movie in movies:
            kp_id = movie["id"]
            if kp_id not in used_movie_ids:
                all_movies.append(getMovieInfo(kp_id=kp_id, db=db, schema_type=ListMovieInfo))
                used_movie_ids.add(kp_id)

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
    else:
        raise GenresCountError(f"Количество жанров {length_genres}, min=3, max=10")

    genres_data = UpdateUser(genres=output_genres)
    if user := update_user(user_id=user_id, user_data=genres_data, db=db):
        return True
    return False


def rec_by_llm(user_id: int, db: Session) -> list[ListMovieInfo]:
    user = get_user_by_id(user_id=user_id, db=db, schema_type=UserRecommendation)
    user_genres = getTopGenres(user.genres)

    lst = []
    watched = allUserMovieInTable("watched_movies", user_id, db)
    watch_list = allUserMovieInTable("watch_list_movies", user_id, db)
    favorited = allUserMovieInTable("favorite_movies", user_id, db)
    lst = watched + watch_list + favorited

    recommended = recommend_movies_gigachat(user_genres, lst).split("\n")
    recommended = [movie for movie in recommended if len(movie) > 1 and movie[0].isdigit()]
    
    titles = [movie.split('. ', 1)[1].strip() for movie in recommended if '. ' in movie]
    movies: list[ListMovieInfo] = []
    
    for title in titles:
        url = "https://api.kinopoisk.dev/v1.4/movie/search"
        params = {"limit": 1, "page": 1, "query": title}
        response = requests.get(url=url, params=params, headers=headers)
        if response.status_code == 200:
            data = response.json()
            movie = getMovieInfo(data.get("docs", [])[0]["id"], db=db, schema_type=ListMovieInfo)
            movies.append(movie)

    return movies
