from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey, Index, UniqueConstraint
from sqlalchemy.orm import relationship
from .database import Base, engine


class User(Base):
    __tablename__ = "users"
    __table_args__ = (
        Index("ix_users_email", "email"),
        Index("ix_users_username", "username"),
        Index("ix_users_email_password", "email", "password"),
        {"sqlite_autoincrement": True}
    )
    
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String(256), nullable=False, unique=True)
    username = Column(String(128), nullable=False, unique=True)
    password = Column(String(1024), nullable=False)
    user_description = Column(String(2048), nullable=True)
    similar_movies = Column(JSON, default=None)
    genres_preferences = Column(JSON, default=None)

    reviews = relationship("Review", back_populates="user")

    favorite_movies = relationship(
        "Movie",
        secondary="favorite_movies",
        back_populates="favorited_by"
    )
    watched_movies = relationship(
        "Movie",
        secondary="watched_movies",
        back_populates="watched_by"
    )
    watch_list = relationship(
        "Movie",
        secondary="watch_list_movies",
        back_populates="in_watch_lists"
    )


class Movie(Base):
    __tablename__ = "movies"
    __table_args__ = (
        Index("ix_movies_kp_id", "kp_id"),
        Index("ix_movies_name", "name"),
        {"sqlite_autoincrement": True}        
    )

    id = Column(Integer, primary_key=True)
    kp_id = Column(Integer, nullable=False, unique=True)
    name = Column(String(512))
    alternativeName = Column(String(512))
    year = Column(Integer)
    status = Column(String(128))
    description = Column(String(8092))
    shortDescription = Column(String(1024))
    rating = Column(Float)
    votes = Column(Integer)
    movieLength = Column(Integer)
    ratingMpaa = Column(String(64))
    ageRating = Column(Integer)
    poster = Column(String(512))
    backdrop = Column(String(512))
    genres = Column(JSON)
    countries = Column(JSON)
    persons = Column(JSON)
    budget = Column(JSON)
    fees = Column(JSON)
    premiere = Column(JSON)
    similarMovies = Column(JSON)
    sequelsAndPrequels = Column(JSON)
    watchability = Column(JSON)
    top250 = Column(Integer)
    lists = Column(JSON)

    reviews = relationship("Review", back_populates="movie")

    favorited_by = relationship(
        "User",
        secondary="favorite_movies",
        back_populates="favorite_movies"
    )
    watched_by = relationship(
        "User",
        secondary="watched_movies",
        back_populates="watched_movies"
    )
    in_watch_lists = relationship(
        "User",
        secondary="watch_list_movies",
        back_populates="watch_list"
    )


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = (       
        {"sqlite_autoincrement": True}
    )

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    kp_id = Column(Integer, ForeignKey("movies.id"), primary_key=True)
    rating = Column(Integer, default=0)
    text = Column(String(4096))

    user = relationship("User", back_populates="reviews")
    movie = relationship("Movie", back_populates="reviews")

    @property
    def username(self):
        return self.user.username if self.user else None


class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    slug = Column(String)


class FavoriteList(Base):
    __tablename__ = "favorite_movies"
    __table_args__ = {"sqlite_autoincrement": True}

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    kp_id = Column(Integer, ForeignKey("movies.kp_id"), primary_key=True)


class WatchedMovies(Base):
    __tablename__ = "watched_movies"
    __table_args__ = {"sqlite_autoincrement": True}

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    kp_id = Column(Integer, ForeignKey("movies.kp_id"), primary_key=True)


class WatchList(Base):
    __tablename__ = "watch_list_movies"
    __table_args__ = {"sqlite_autoincrement": True}

    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    kp_id = Column(Integer, ForeignKey("movies.kp_id"), primary_key=True)


Base.metadata.create_all(bind=engine)