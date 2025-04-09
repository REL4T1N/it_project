from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from passlib.context import CryptContext
import sqlite3
from uuid import uuid4

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DB_NAME = "users.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            description TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None
    description: Optional[str] = None

class UserResponse(BaseModel):
    email: EmailStr
    username: str
    password: str  
    description: Optional[str] = None

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT email, username, password, description FROM users WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    
    return {"email": user[0], "username": user[1], "password": user[2], "description": user[3]}

@app.post("/users/register", response_model=dict)
async def register_user(user: UserCreate):
    user_id = str(uuid4())
    hashed_password = hash_password(user.password)
    
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO users (user_id, email, username, password, description) VALUES (?, ?, ?, ?, ?)",
            (user_id, user.email, user.username, hashed_password, None)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(status_code=400, detail="Электронная почта уже используется")
    
    conn.close()
    return {"user_id": user_id, "message": "Пользователь успешно зарегистрирован"}

@app.post("/users/login", response_model=dict)
async def login_user(user: UserLogin):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, password FROM users WHERE email = ?", (user.email,))
    result = cursor.fetchone()
    conn.close()
    
    if not result or not verify_password(user.password, result[1]):
        raise HTTPException(status_code=401, detail="Недействительные учетные данные")
    
    return {"user_id": result[0], "message": "Вход успешен"}

@app.put("/users/{user_id}", response_model=dict)
async def update_user(user_id: str, user: UserUpdate):
    conn = sqlite3.connect(DB_NAME)
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
            raise HTTPException(status_code=400, detail="Электронная почта уже используется")
    
    cursor.execute(
        "UPDATE users SET email = ?, username = ?, password = ?, description = ? WHERE user_id = ?",
        (updated_data["email"], updated_data["username"], updated_data["password"], updated_data["description"], user_id)
    )
    conn.commit()
    conn.close()
    return {"message": "Пользователь успешно обновлен"}

@app.delete("/users/{user_id}", response_model=dict)
async def delete_user(user_id: str):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE user_id = ?", (user_id,))
    if cursor.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    conn.commit()
    conn.close()
    return {"message": "Пользователь успешно удален"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)