from sqlalchemy import Column, Integer, String, Float, ForeignKey, PrimaryKeyConstraint
from sqlalchemy.orm import relationship
from .database import Base, engine


class FavoriteFilm(Base):
    __tablename__ = 'favorite_films'

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    film_id = Column(Integer, ForeignKey('films.id'), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'film_id'),
    )

    user = relationship("User", back_populates="favorite_films")
    film = relationship("Film", back_populates="favorited_by")


class WatchlistFilm(Base):
    __tablename__ = 'watchlist_films'

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    film_id = Column(Integer, ForeignKey('films.id'), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'film_id'),
    )

    user = relationship("User", back_populates="watchlist_films")
    film = relationship("Film", back_populates="in_watchlist_of")


class WatchedFilm(Base):
    __tablename__ = 'watched_films'

    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    film_id = Column(Integer, ForeignKey('films.id'), nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('user_id', 'film_id'),
    )

    user = relationship("User", back_populates="watched_films")
    film = relationship("Film", back_populates="watched_by")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    about_user = Column(String, nullable=True)

    reviews = relationship("Review", back_populates="user")
    favorite_films = relationship("FavoriteFilm", back_populates="user")
    watchlist_films = relationship("WatchlistFilm", back_populates="user")
    watched_films = relationship("WatchedFilm", back_populates="user")

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
    genres = Column(String, nullable=True)
    countries = Column(String, nullable=True)
    bayesian_rating = Column(Float, nullable=True)

    reviews = relationship("Review", back_populates="film")
    favorited_by = relationship("FavoriteFilm", back_populates="film")
    in_watchlist_of = relationship("WatchlistFilm", back_populates="film")
    watched_by = relationship("WatchedFilm", back_populates="film")

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    film_id = Column(Integer, ForeignKey("films.id"), nullable=False)
    rating = Column(Integer, nullable=False)
    description = Column(String, nullable=True)
    
    user = relationship("User", back_populates="reviews")
    film = relationship("Film", back_populates="reviews")

Base.metadata.create_all(bind=engine)