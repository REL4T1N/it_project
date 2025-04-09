from fastapi import APIRouter, HTTPException
from app.api.schemas.user import UserCreate, UserLogin, UserUpdate, UserResponse, MovieResponse
from app.db.database import get_db_connection
from app.core.security import hash_password, verify_password
from uuid import uuid4
from datetime import datetime
import sqlite3
router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT email, username, password, description FROM users WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()
    
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    return UserResponse(email=user[0], username=user[1], password=user[2], description=user[3])

@router.post("/register", response_model=dict)
async def register_user(user: UserCreate):
    user_id = str(uuid4())
    hashed_password = hash_password(user.password)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO users (user_id, email, username, password, description) VALUES (?, ?, ?, ?, ?)",
            (user_id, user.email, user.username, hashed_password, None)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Email уже существует")
    
    conn.close()
    return {"user_id": user_id, "message": "Пользователь успешно зарегистрирован"}

@router.post("/login", response_model=dict)
async def login_user(user: UserLogin):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, password FROM users WHERE email = ?", (user.email,))
    result = cursor.fetchone()
    conn.close()
    
    if not result or not verify_password(user.password, result[1]):
        raise HTTPException(status_code=401, detail="Неверные учетные данные")
    
    return {"user_id": result[0], "message": "Вход выполнен успешно"}

@router.put("/{user_id}", response_model=dict)
async def update_user(user_id: str, user: UserUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT email, username, password, description FROM users WHERE user_id = ?", (user_id,))
    existing_user = cursor.fetchone()
    
    if not existing_user:
        conn.close()
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    updated_data = {
        "email": user.email if user.email is not None else existing_user[0],
        "username": user.username if user.username is not None else existing_user[1],
        "password": hash_password(user.password) if user.password is not None else existing_user[2],
        "description": user.description if user.description is not None else existing_user[3]
    }
    
    if user.email and user.email != existing_user[0]:
        cursor.execute("SELECT 1 FROM users WHERE email = ? AND user_id != ?", (user.email, user_id))
        if cursor.fetchone():
            conn.close()
            raise HTTPException(status_code=400, detail="Email уже используется")
    
    cursor.execute(
        "UPDATE users SET email = ?, username = ?, password = ?, description = ? WHERE user_id = ?",
        (updated_data["email"], updated_data["username"], updated_data["password"], updated_data["description"], user_id)
    )
    conn.commit()
    conn.close()
    
    return {"message": "Пользователь успешно обновлен"}

@router.delete("/{user_id}", response_model=dict)
async def delete_user(user_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE user_id = ?", (user_id,))
    
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    conn.commit()
    conn.close()
    return {"message": "Пользователь успешно удален"}

