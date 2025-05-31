from fastapi import APIRouter, status, Cookie, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from ...services.users.users_service import get_user_by_id, check_for_email_and_password, add_user, update_user, delete_user
from ...database import get_db
from ...schemas.user import LoginUser, RegisterUser, UpdateUser, UserResponse

user_router = APIRouter(prefix="/api", tags=["User"])

# проверка user_id в Cookie
@user_router.get("/users/me", response_model=UserResponse)
async def get_current_user(user_id: int | None = Cookie(default=None, alias="user_id"), db: Session = Depends(get_db)):
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    user = get_user_by_id(user_id=user_id, db=db, schema_type=UserResponse)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

# Получение информации о пользователе
@user_router.get("/users/{user_id}", response_model=UserResponse)
async def get_user_info(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(user_id=user_id, db=db, schema_type=UserResponse)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

# Логин пользователя
@user_router.post("/users/login", response_model=UserResponse)
async def login_user(user_data: LoginUser, response: Response, db: Session = Depends(get_db)):
    user = check_for_email_and_password(email=user_data.email, password=user_data.password, db=db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    response.set_cookie(
        key="user_id",
        value=str(user.id),
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=3600  # 1 час
    )
    return user

# Регистрация пользователя
@user_router.post("/users", response_model=UserResponse)
async def register_user(user_data: RegisterUser, response: Response, db: Session = Depends(get_db)):
    try:
        user = add_user(user_data=user_data, db=db)
        response.set_cookie(key="user_id", value=str(user.id), httponly=True)
        return user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

# Обновление данных пользователя
@user_router.put("/users/{user_id}", response_model=UserResponse)
async def update_user_info(user_id: int, user_data: UpdateUser, db: Session = Depends(get_db)):
    try:
        user = update_user(user_id=user_id, user_data=user_data, db=db)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

# Логаут пользователя
@user_router.post("/users/logout")
async def logout_user(response: Response):
    response.delete_cookie(key="user_id")
    return {"message": "Logged out successfully"}

# Удаление пользователя
@user_router.delete("/users/{user_id}")
async def delete_user_info(user_id: int, response: Response, db: Session = Depends(get_db)):
    user = delete_user(user_id=user_id, db=db)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    response.delete_cookie(key="user_id")
    return {"message": "User deleted successfully"}

