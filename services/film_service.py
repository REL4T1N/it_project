from sqlalchemy import select
from sqlalchemy.orm import Session
from typing import List


from ..models import Film
from ..errors import FilmNotFound
from ..database import SessionLocal

def add_film():
    pass

def update_film():
    pass

def delete_film():
    pass


def get_film_info(film_id: int, db: Session) -> Film:
    try:
        film = db.execute(
            select(Film).where(Film.id == film_id)
        ).scalar()

        if not film:
            raise FilmNotFound
        
        return film
    
    except Exception as e:
        raise e
    

def get_top_films(db: Session) -> List[Film]:
    try:
        movies = db.query(Film).order_by(Film.bayesian_rating.desc()).limit(100).all()
        for movie in movies:
            movie.bayesian_rating = round(movie.bayesian_rating, 2)
        return movies
    except Exception as e:
        raise e
    


    

