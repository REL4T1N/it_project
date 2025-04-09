from pydantic import BaseModel, EmailStr
from typing import Optional

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

class MovieResponse(BaseModel):
    movie_id: int
    title: str
    country: str
    release_date: str
    genre: str
    description: Optional[str] = None
    additional_info: Optional[str] = None
    poster_url: Optional[str] = None