from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from database import Base, engine

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    about_user = Column(String, nullable=True)


class Film(Base):
    __tablename__ = "films"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    rating_imdb = Column(Float, nullable=True)
    votes_imdb = Column(Integer, nullable=True)
    about_film = Column(String, nullable=True)
    time = Column(Integer, nullable=True)
    year = Column(Integer, nullable=True)
    age_rating = Column(Integer, nullable=True)
    poster_url = Column(String, nullable=True)
    backdrop_url = Column(String, nullable=True)
    # Сохраним список жанров и стран в виде строки (например, "драма, комедия")
    genres = Column(String, nullable=True)
    countries = Column(String, nullable=True)


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    film_id = Column(Integer, nullable=False)
    rating = Column(Integer, nullable=False)
    description = Column(String, nullable=True)

Base.metadata.create_all(engine)