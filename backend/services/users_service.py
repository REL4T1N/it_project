from sqlalchemy.orm import Session
from typing import Type
from pydantic import BaseModel
from ..models import User
# from ..__schemas import UserResponse, RegisterUser, UpdateUser
from ..schemas.user import UserResponse, RegisterUser, UpdateUser

def get_user_data(user_id: int, db: Session) -> User | None:
    return db.query(User).filter(User.id == user_id).first()

# Получение пользователя по ID
def get_user_by_id(user_id: int, db: Session, schema_type: Type[BaseModel]) -> BaseModel | None:
    if user := get_user_data(user_id=user_id, db=db):
        return schema_type.model_validate(user) if user else None
    return None

# Проверка существования пользователя по email или username
def check_for_email_or_username(email: str, username: str, db: Session) -> UserResponse | None:
    user = db.query(User).filter((User.email == email) | (User.username == username)).first()
    return UserResponse.model_validate(user) if user else None

# Создание нового пользователя
def add_user(user_data: RegisterUser, db: Session) -> UserResponse:
    if check_for_email_or_username(user_data.email, user_data.username, db):
        raise ValueError("User with this email or username already exists")
    
    user = User(
        email=user_data.email, 
        username=user_data.username, 
        password=user_data.password
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserResponse.model_validate(user)

# Проверка пользователя для логина (email и пароль)
def check_for_email_and_password(email: str, password: str, db: Session) -> UserResponse | None:
    user = db.query(User).filter(User.email == email, User.password == password).first()
    return UserResponse.model_validate(user) if user else None

# Обновление пользователя
def update_user(user_id: int, user_data: UpdateUser, db: Session) -> UserResponse | None:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None

    if (user_data.email and user_data.email != user.email) or (user_data.username and user_data.username != user.username):
        if check_for_email_or_username(user_data.email or user.email, user_data.username or user.username, db):
            raise ValueError("Email or username already taken")
        
    if user_data.email is not None:
        user.email = user_data.email
    if user_data.username is not None:
        user.username = user_data.username
    if user_data.password is not None:
        user.password = user_data.password
    if user_data.user_description is not None:
        user.user_description = user_data.user_description
    if user_data.similar_movies is not None:
        user.similar_movies = user_data.similar_movies
    if user_data.genres is not None:
        user.genres_preferences = user_data.genres

    db.commit()
    db.refresh(user)
    return UserResponse.model_validate(user)

# Удаление пользователя
def delete_user(user_id: int, db: Session) -> UserResponse | None:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None
    
    db.delete(user)
    db.commit()
    return UserResponse.model_validate(user)