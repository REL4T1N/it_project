from pydantic import BaseModel, Field, EmailStr, field_validator
from decimal import Decimal
from typing import List, Optional

class LoginUser(BaseModel):
    email: EmailStr
    password: str = Field(min_length=3)

class RegisterUser(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3)
    password: str = Field(min_length=3)

class GenreBase(BaseModel):
    name: str

class CountryBase(BaseModel):
    name: str

    