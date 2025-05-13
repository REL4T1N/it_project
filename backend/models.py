from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey, Index
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

    reviews = relationship("Review", back_populates="user")


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


class Review(Base):
    __tablename__ = "reviews"
    __table_args__ = (
        Index("ix_reviews_user_id", "user_id"),
        Index("ix_reviews_movie_id", "movie_id"),
        Index("ix_reviews_user_movie_ids", "user_id", "movie_id"),
        {"sqlite_autoincrement": True}
    )

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    movie_id = Column(Integer, ForeignKey("movies.id"), nullable=False)
    rating = Column(Integer, default=0)
    text = Column(String(4096))

    user = relationship("User", back_populates="reviews")
    movie = relationship("Movie", back_populates="reviews")
    
Base.metadata.create_all(bind=engine)