from pydantic import BaseModel, Field
from typing import Optional


class ReviewResponse(BaseModel):
    review_id: int
    user_id: int
    movie_id: int
    rating: int 
    text: Optional[str] = None

    class Config:
        from_attributes = True


class ReviewCreate(BaseModel):
    rating: int
    text: Optional[str]


class ReviewUpdate(BaseModel):
    rating: Optional[int] = None
    text: Optional[str] = None