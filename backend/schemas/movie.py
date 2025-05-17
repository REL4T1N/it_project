from pydantic import BaseModel,Field
from typing import Optional


class MovieInfo(BaseModel):
    movie_id: int = Field(..., alias='id')
    kp_id: int
    name: Optional[str] = Field(max_length=512)
    year: Optional[int]
    description: Optional[str] = Field(max_length=8092, default=None)
    shortDescription: Optional[str] = Field(max_length=1024)
    rating_kp: float = Field(default=0.0, le=10.0, alias='rating')
    rating: float = Field(default=0.0, le=10.0)
    votes: int = Field(default=0)
    length: Optional[int] = Field(alias='movieLength')
    ageRating: Optional[int]
    poster: Optional[str]
    backdrop: Optional[str]
    genres: Optional[list]
    countries: Optional[list]
    persons: Optional[list]
    budget: Optional[dict]
    fees: Optional[dict]
    premiere: Optional[dict]
    similarMovies: Optional[list]
    sequelsAndPrequels: Optional[list]
    watchability: Optional[dict]

    class Config:
        from_attributes = True


class ListMovieInfo(BaseModel):
    movie_id: int = Field(..., alias='id')
    kp_id: int
    name: Optional[str] = Field(max_length=512)
    year: Optional[int]
    rating_kp: float = Field(default=0.0, le=10.0, alias='rating')
    length: Optional[int] = Field(alias='movieLength')
    ageRating: Optional[int]
    poster: Optional[str]
    genres: list
    countries: list
    # persons: list

    class Config:
        from_attributes = True

    
class RecMovieInfo(BaseModel):
    movie_id: int = Field(..., alias='id')
    kp_id: int
    name: Optional[str] = Field(max_length=512)
    year: Optional[int]
    rating_kp: float = Field(default=0.0, le=10.0, alias='rating')
    length: Optional[int] = Field(alias='movieLength')
    ageRating: Optional[int]
    poster: Optional[str]
    genres: list
    countries: list
    # persons: list

    class Config:
        from_attributes = True
