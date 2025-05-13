from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class AuthUser(BaseModel):
    email: EmailStr 
    username: str = Field(min_length=3)  
    password: str = Field(min_length=8)  

class LoginUser(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)  

class UpdateUser(BaseModel):
    email: EmailStr | None = None 
    username: str | None = Field(default=None, min_length=3)  
    password: str | None = Field(default=None, min_length=8)  
    user_description: str | None = None

class UserResponse(BaseModel):
    id: int  
    email: EmailStr
    username: str  
    user_description: str | None  

    class Config:
        from_attributes = True  # Позволяет маппить объекты SQLAlchemy в Pydantic


class MovieInfo(BaseModel):
    movie_id: int = Field(..., alias='id')
    kp_id: int
    name: str | None = Field(max_length=512)
    year: int | None
    description: str | None = Field(max_length=8092, default=None)
    shortDescription: str | None = Field(max_length=1024)
    rating_kp: float = Field(default=0.0, le=10.0, alias='rating')
    rating: float = Field(default=0.0, le=10.0)
    votes: int = Field(default=0)
    length: int | None = Field(alias='movieLength')
    ageRating: int | None
    poster: str | None
    backdrop: str | None
    genres: list | None
    countries: list | None
    persons: list | None
    budget: dict | None
    fees: dict | None
    premiere: dict | None
    similarMovies: list | None
    sequelsAndPrequels: list | None
    watchability: dict | None

    class Config:
        from_attributes = True


class TopMovieInfo(BaseModel):
    movie_id: int = Field(..., alias='id')
    kp_id: int
    name: str | None = Field(max_length=512)
    year: int | None
    shortDescription: str | None = Field(max_length=1024)
    rating_kp: float = Field(default=0.0, le=10.0, alias='rating')
    votes: int = Field(default=0)
    length: int | None = Field(alias='movieLength')
    ageRating: int | None
    poster: str | None
    genres: list
    countries: list
    # persons: list

    class Config:
        from_attributes = True


# схема для Поиска:

class ReviewResponse(BaseModel):
    review_id: int
    user_id: int
    movie_id: int
    rating: int 
    text: str | None

    class Config:
        from_attributes = True


class ReviewCreate(BaseModel):
    rating: int
    text: str | None


class ReviewUpdate(BaseModel):
    rating: Optional[int] = None
    text: Optional[str] = None