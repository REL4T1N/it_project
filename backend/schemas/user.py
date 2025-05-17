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
    email: Optional[EmailStr] 
    username: Optional[str] = Field(min_length=3)  
    password: Optional[str] = Field(min_length=8)  
    user_description: Optional[str]
    similar_movies: Optional[list]
    genres: Optional[dict]


class UserResponse(BaseModel):
    id: int  
    email: EmailStr
    username: str  
    user_description: str | None  

    class Config:
        from_attributes = True


class UserRecommendation(BaseModel):
    id: int
    similar_movies: Optional[list]
    genres: Optional[dict]

    class Config:
        from_attributes = True
    

class UpdateGenresRequest(BaseModel):
    genres: list[str]