from sqlalchemy import select
from sqlalchemy.orm import Session
from ..models import User, Film
from ..errors import UserNotFound, UsernameAlreadyExistsError, EmailAlreadyExistsError, FilmNotFound

'''
Функции с запросами к БД имеют синхронную реализацию, потому что sqlite не поддерживает асинхронность.
Если проект будет переведён под Postgresql, то необходимо будет переписать все функции в асинхроный формат.
'''

def get_user_by_id(user_id: int, db: Session) -> User | None:
    if user_id is None:
        return None
    try:
        user = db.execute(
            select(User).where(User.id == user_id)
        ).scalar()
        if not user:
            raise UserNotFound
        return user
    
    except Exception as e:
        raise e


def login_user(email: str, password: str, db: Session) -> User | None:
    if email is None or password is None:
        return None
    try:
        user = db.execute(
            select(User).where(User.email == email, User.password == password)
        ).scalar()
        if not user:
            raise UserNotFound
        return user
    
    except Exception as e:
        raise e


def register_user(username: str, email: str, password: str, db: Session) -> User:
    try:
        existing_user_username = db.execute(
            select(User).where(User.username == username)
        ).scalar()
        if existing_user_username:
            raise UsernameAlreadyExistsError
        
        existing_user_email = db.execute(
            select(User).where(User.email == email)
        ).scalar()
        if existing_user_email:
            raise EmailAlreadyExistsError
        
        user = User(username=username, email=email, password=password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    except Exception as e:
        db.rollback()


def update_user(user_id: int, username: str, email: str, password: str, about_user: str, db: Session) -> User:
    try:
        user = db.execute(
            select(User).where(User.id == user_id)
        ).scalar()
        if not user:
            raise UserNotFound


        if username is not None and user.username != username:
            existing_user_username = db.execute(
                select(User).where(User.username == username)
            ).scalar()
            if existing_user_username:
                raise UsernameAlreadyExistsError
        
        if email is not None and user.email != email:
            existing_user_email = db.execute(
                select(User).where(User.email == email)
            ).scalar()
            if existing_user_email:
                raise EmailAlreadyExistsError
        
        if username is not None:
            user.username = username
        if email is not None:
            user.email = email
        if password is not None:
            user.password = password
        if about_user is not None:
            user.about_user = about_user

        db.commit()
        db.refresh(user)
        return user
    
    except Exception as e:
        db.rollback()
        raise e


def delete_user(user_id: int, db: Session) -> bool:
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise UserNotFound
        
        db.delete(user)
        db.commit()
        return True
    
    except Exception as e:
        db.rollback()
        raise e
    

def add_film_to_favorites(user_id: int, film_id: int, db: Session) -> bool:
    try:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise UserNotFound
        
        film = db.query(Film).filter(Film.id == film_id).first()
        if not film:
            raise FilmNotFound
        
        if film not in user.favorite_films:
            user.favorite_films.append(film)
            db.commit()
            return True
        return False  # Фильм уже в избранном
    
    except Exception as e:
        db.rollback()
        raise e