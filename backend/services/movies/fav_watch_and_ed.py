from sqlalchemy.orm import Session

from ...database import Base
from ...models import FavoriteList, WatchedMovies, WatchList
from ...schemas.movie import ListMovieInfo
from ...services.users_service import get_user_data
from ..errors.movie import MovieAlreadyExistInTable, MovieNotFoundInTable

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
        movies = getattr(user, table_name, None)

        return [ListMovieInfo.model_validate(movie) for movie in movies]
    
    except Exception as e:
        raise e
        

