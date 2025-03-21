from pydantic import BaseModel, Field, EmailStr, field_validator
from decimal import Decimal
from typing import List, Optional

class LoginUser(BaseModel):
    email: EmailStr
    password: str

class RegisterUser(BaseModel):
    email: EmailStr
    username: str
    password: str

class UpdateUser(BaseModel):
    id: int
    email: EmailStr | None
    username: str | None
    password: str | None
    about_user: str | None

class GenreBase(BaseModel):
    name: str

class CountryBase(BaseModel):
    name: str

    