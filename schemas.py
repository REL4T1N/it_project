from pydantic import BaseModel, Field, EmailStr

class LoginUser(BaseModel):
    email: EmailStr
    password: str = Field(min_length=3)

class RegisterUser(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3)
    password: str = Field(min_length=3)
    