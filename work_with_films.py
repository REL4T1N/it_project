from sqlalchemy import select, desc
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Film
from schemas import GenreBase, CountryBase
from errors import FilmInDB, FilmNotFound


def add_film(name: str | None = None, 
             about_film: str | None = None, 
             time: int | None = None, 
             year: int | None = None, 
             age_rating: int | None = None, 
             rating_imdb: float | None = None, 
             votes_imdb: int | None = None, 
             poster_url: str | None = None, 
             backdrop_url: str | None = None, 
             genres: list[GenreBase] = [], 
             countries: list[CountryBase] = []) -> Film:
    db: Session = SessionLocal()

    try:
        # Проверка, существует ли фильм с таким именем
        film = db.query(Film).filter(Film.name == name).first()
        if film or name is None:
            raise FilmInDB("Film already exists or name is None")

        # Создание нового фильма
        new_film = Film(
            name=name,
            about_film=about_film,
            time=time,
            genres=genres,
            countries=countries,
            year=year,
            age_rating=age_rating,
            rating_imdb=rating_imdb,
            votes_imdb=votes_imdb,
            poster_url=poster_url,
            backdrop_url=backdrop_url,
            premiere=(year >= 2025),  # Логика для premiere
        )

        
        db.add(new_film)
        db.commit()
        db.refresh(new_film)
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


def get_top_films():
    db: Session = SessionLocal()
    try:
        return db.query(Film).order_by(Film.rating_imdb.desc(), Film.votes_imdb.desc()).limit(100).all()
    except Exception as e:
        db.rollback()
        return []
    finally:
        db.close()


def get_all_movie_info(film_id: str | None = None):
    db: Session = SessionLocal()
    try:
        if film_id:
            movie = db.execute(
                select(Film).where(Film.id == film_id)
            ).scalar()
            if not movie:
                raise FilmNotFound
            return movie

    except Exception as e:
        raise e
    finally:
        db.close()

