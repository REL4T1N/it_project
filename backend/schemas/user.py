from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class RegisterUser(BaseModel):
    email: EmailStr 
    username: str = Field(min_length=3)  
    password: str = Field(min_length=8)  


class LoginUser(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)  


class UpdateUser(BaseModel):
    email: Optional[EmailStr] = None 
    username: Optional[str] = Field(min_length=3, default=None)  
    password: Optional[str] = Field(min_length=8, default=None)  
    user_description: Optional[str] = None
    similar_movies: Optional[list[int]] = None
    genres: Optional[dict] = None


class UserResponse(BaseModel):
    id: int  
    email: EmailStr
    username: str  
    user_description: str | None  

    class Config:
        from_attributes = True


class UserRecommendation(BaseModel):
    id: int
    similar_movies: Optional[list] = None
    genres: Optional[dict] = None

    class Config:
        from_attributes = True
    

class UpdateGenresRequest(BaseModel):
    genres: list[str]