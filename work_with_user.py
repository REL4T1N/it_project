from database import SessionLocal
from sqlalchemy import select
from sqlalchemy.orm import Session
from models import User
from errors import EmailAlreadyExistsError, UsernameAlreadyExistsError, UserNotFound

def check_user_in_DB(email: str, password: str) -> User:
    db: Session = SessionLocal()

    try:
        user = db.execute(
            select(User).where(User.email == email, User.password == password)
        ).scalar()
        if not user:
            raise UserNotFound
        return user
    except Exception as e:
        raise e
    finally:
        db.close()


def register_user(username: str, email: str, password: str) -> User:
    db: Session = SessionLocal()

    try:
        existing_user_email = db.execute(
            select(User).where(User.email == email)
        ).scalar()

        if existing_user_email:
            raise EmailAlreadyExistsError
        
        existing_user_username = db.execute(
            select(User).where(User.username == username)
        ).scalar()

        if existing_user_username:
            raise UsernameAlreadyExistsError

        new_user = User(username=username, email=email, password=password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except Exception as e:
        db.rollback() # откат
        raise e
    finally:
        db.close()


def update_user_profile(user_id: int, 
                        username: str | None = None, 
                        email: str | None = None, 
                        password: str | None = None, 
                        about_user: str | None = None) -> User:
    
    db: Session = SessionLocal()

    try:
        user = db.execute(
            select(User).where(User.id == user_id)
        ).scalar()
        if not user:
            raise UserNotFound
        
        if username is not None and username != user.username:  
            existing_user_username = db.execute(
                select(User).where(User.username == username)
            ).scalar()
            if existing_user_username:
                raise UsernameAlreadyExistsError
            
        if email is not None and email != user.email:
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
    
    finally:
        db.close()


def get_all_users() -> list[User]:
    db: Session = SessionLocal()

    try:
        users = db.execute(select(User)).scalars().all()
        return users
    except Exception as e:
        print(f"Ошибка при получении пользователей: {e}")
        raise e
    finally:
        db.close()



# if __name__ == "__main__":
#     try:
#         user1 = check_user_in_DB("ama@ma.ru", "111")
#         print(f"Пользователь найден: {user1.username}, {user1.email}")

#         user2 = check_user_in_DB("john@doe.com", "222")
#         print(f"Пользователь найден: {user2.username}, {user2.email}")
#     except UserNotFound as e:
#         print(e)
#     except Exception as e:
#         print(f"Неизвестная ошибка: {e}")

# # Добавление тестовых данных
# if __name__ == "__main__":
#     try:
#         # register_user(username="alex", email="ama@ma.ru", password="111")
#         register_user(username="john", email="john@doe.com", password="222")
#         print("Тестовые данные добавлены.")
#     except Exception as e:
#         print(f"Ошибка при добавлении данных: {e}")


# if __name__ == "__main__":
#     users = get_all_users()
#     if users:
#         for user in users:
#             print(f"ID: {user.id}, Username: {user.username}, Email: {user.email}, Password: {user.password}, About: {user.about_user}")
#     else:
#         print("Пользователи не найдены.")