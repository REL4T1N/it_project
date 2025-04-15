from pydantic import BaseModel, EmailStr, Field

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