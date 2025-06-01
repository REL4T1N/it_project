from sqlalchemy.orm import Session

from ...schemas.movie import ListMovieInfo
from ...schemas.user import UpdateUser
from ...services.users.users_service import get_user_data, update_user
from ..errors.movie import MovieAlreadyExistInTable, MovieNotFoundInTable
from ..errors.user import UserNotFound

from .movie_repository import checkMovieInDB

def checkMovieInTable(model_name, user_id: int, kp_id: int, db: Session):
    return db.query(model_name).filter(model_name.user_id == user_id, model_name.kp_id == kp_id).first()


def addMovieToTable(model_name, user_id: int, kp_id: int, db: Session) -> bool:
    entry = model_name(user_id=user_id, kp_id=kp_id)
    try:
        if check := checkMovieInTable(model_name, user_id, kp_id, db):
            raise MovieAlreadyExistInTable
        db.add(entry)
        db.commit()
        db.refresh(entry)
        return True
    
    except Exception as e:
        db.rollback()
        raise e


def deleteMovieFromTable(model_name, user_id: int, kp_id: int, db: Session) -> bool:
    try:
        if check := checkMovieInTable(model_name, user_id, kp_id, db):
            db.delete(check)
            db.commit()
            return True
        elif not check:
            raise MovieNotFoundInTable
        return False

    except Exception as e:
        db.rollback()
        raise e
    

def allUserMovieInTable(table_name: str, user_id: int, db: Session) -> list[ListMovieInfo]:
    try:
        user = get_user_data(user_id=user_id, db=db)
        if table_name == "watch_list_movies":
            table_name = "watch_list"
        movies = getattr(user, table_name, None) or [] 

        return [ListMovieInfo.model_validate(movie) for movie in movies]
    
    except Exception as e:
        raise e
        

def updateUserSimilarMovies(user_id: int, kp_id: int, db: Session) -> bool:
    movie_data = checkMovieInDB(kp_id=kp_id, db=db)
    user = get_user_data(user_id=user_id, db=db)
    if not user:
        raise UserNotFound

    user_similar = user.similar_movies

    if user_similar is None:
        user_similar = []

    if movie_data is None or not getattr(movie_data, "similarMovies", None):
        movie_similar = []
    else:
        movie_similar = [movie["id"] for movie in movie_data.similarMovies]

    for movie_id in movie_similar:
        if movie_id not in user_similar:
            user_similar.append(movie_id)

    if kp_id in user_similar:
        user_similar.remove(kp_id)

    user.similar_movies = user_similar
    db.commit()
    db.refresh(user)
    return True