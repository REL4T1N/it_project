from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Text, ARRAY, Date
from sqlalchemy.ext.asyncio import AsyncAttrs, create_async_engine, AsyncSession
from sqlalchemy.orm import DeclarativeBase, relationship, sessionmaker
from datetime import datetime
from config import settings


DATABASE_URL = (
    f"postgresql+asyncpg://{settings.db_user}:{settings.db_password}@"
    f"{settings.db_host}:{settings.db_port}/{settings.db_name}"
)
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


# Определение базового класса
class Base(AsyncAttrs, DeclarativeBase):
    pass

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)
    join_date = Column(DateTime, default=datetime.utcnow)
    watch_list = Column(ARRAY(Integer))
    film_list = Column(ARRAY(Integer))
    
    reviews = relationship('Review', back_populates='user')

class Actor(Base):
    __tablename__ = 'actors'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    surname = Column(String(100))
    last_name = Column(String(100))
    age = Column(Integer)
    country = Column(String(100))
    
    produced_films = relationship('Film', back_populates='producer_actor', foreign_keys='[Film.producer]')
    directed_films = relationship('Film', back_populates='director_actor', foreign_keys='[Film.director]')
    acted_films = relationship('Film', back_populates='actor_role', foreign_keys='[Film.actor]')

class Film(Base):
    __tablename__ = 'films'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    duration = Column(Integer)
    date = Column(Date)
    type = Column(String(50))
    description = Column(Text)
    rating_imdb = Column(Float)
    rating = Column(Float)
    country = Column(String(100))
    genre = Column(String(100))
    main_roles = Column(ARRAY(Integer))
    producer = Column(Integer, ForeignKey('actors.id'))
    director = Column(Integer, ForeignKey('actors.id'))
    actor = Column(Integer, ForeignKey('actors.id'))
    
    producer_actor = relationship('Actor', back_populates='produced_films', foreign_keys=[producer])
    director_actor = relationship('Actor', back_populates='directed_films', foreign_keys=[director])
    actor_role = relationship('Actor', back_populates='acted_films', foreign_keys=[actor])
    reviews = relationship('Review', back_populates='film')

class Review(Base):
    __tablename__ = 'reviews'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    film_id = Column(Integer, ForeignKey('films.id'))
    rating = Column(Float, nullable=False)
    text = Column(Text)
    
    user = relationship('User', back_populates='reviews')
    film = relationship('Film', back_populates='reviews')
