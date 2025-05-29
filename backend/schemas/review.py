from pydantic import BaseModel, Field
from typing import Optional


class ReviewResponse(BaseModel):
    user_id: int
    username: str
    movie_id: int = Field(alias="kp_id")
    rating: int 
    text: Optional[str] = None

    class Config:
        from_attributes = True


class ReviewCreate(BaseModel):
    rating: int
    text: Optional[str] = None


class ReviewUpdate(BaseModel):
    rating: Optional[int] = None
    text: Optional[str] = None