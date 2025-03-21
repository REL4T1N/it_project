from sqlalchemy.orm import Session, joinedload
from typing import List

from ..models import FavoriteFilm, Film
from ..errors import FilmInFavorite, FilmNotFoundInFavorite


def check_film_in_favorite(user_id: int, film_id: int, db: Session) -> bool:
    return db.query(FavoriteFilm).filter(FavoriteFilm.user_id == user_id, FavoriteFilm.film_id == film_id).first()


def all_films_in_favorite(user_id: int, db: Session) -> List[Film]:
    return db.query(Film).join(FavoriteFilm).filter(FavoriteFilm.user_id == user_id).all()


def add_favorite(user_id: int, film_id: int, db: Session) -> bool:
    try:
        favorite = check_film_in_favorite(user_id=user_id, film_id=film_id, db=db)
        if favorite:
            raise FilmInFavorite
        
        new_favorite = FavoriteFilm(user_id=user_id, film_id=film_id)
        db.add(new_favorite)
        db.commit()
        db.refresh(new_favorite)
        return True

    except Exception as e:
        db.rollback()
        raise e


def delete_favorite(user_id: int, film_id: int, db: Session) -> bool:
    try:
        favorite = check_film_in_favorite(user_id=user_id, film_id=film_id, db=db)
        if not favorite:
            raise FilmNotFoundInFavorite
        
        db.delete(favorite)
        db.commit()
        return True
    
    except Exception as e:
        db.rollback()
        raise e