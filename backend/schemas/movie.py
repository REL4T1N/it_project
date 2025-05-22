from pydantic import BaseModel,Field
from typing import Optional


class MovieInfo(BaseModel):
    movie_id: int = Field(..., alias='id')
    kp_id: int
    name: Optional[str] = Field(max_length=512, default=None)
    year: Optional[int] = None
    description: Optional[str] = Field(max_length=8092, default=None)
    shortDescription: Optional[str] = Field(max_length=1024, default=None)
    rating_kp: float = Field(default=0.0, le=10.0, alias='rating')
    rating: float = Field(default=0.0, le=10.0)
    votes: int = Field(default=0)
    length: Optional[int] = Field(alias='movieLength', default=None)
    ageRating: Optional[int] = None
    poster: Optional[str] = None
    backdrop: Optional[str] = None
    genres: Optional[list] = None
    countries: Optional[list] = None
    persons: Optional[list] = None
    budget: Optional[dict] = None
    fees: Optional[dict] = None
    premiere: Optional[dict] = None
    similarMovies: Optional[list] = None
    sequelsAndPrequels: Optional[list] = None
    watchability: Optional[dict] = None

    class Config:
        from_attributes = True


class ListMovieInfo(BaseModel):
    movie_id: int = Field(..., alias='id')
    kp_id: int
    name: Optional[str] = Field(max_length=512, default=None)
    year: Optional[int] = None
    rating_kp: float = Field(default=0.0, le=10.0, alias='rating')
    length: Optional[int] = Field(alias='movieLength', default=None)
    ageRating: Optional[int] = None
    poster: Optional[str] = None
    genres: list
    countries: list

    class Config:
        from_attributes = True

    
class RecMovieInfo(BaseModel):
    movie_id: int = Field(..., alias='id')
    kp_id: int
    name: Optional[str] = Field(max_length=512, default=None)
    year: Optional[int] = None
    rating_kp: float = Field(default=0.0, le=10.0, alias='rating')
    length: Optional[int] = Field(alias='movieLength', default=None)
    ageRating: Optional[int] = None
    poster: Optional[str] = None
    genres: list
    countries: list

    class Config:
        from_attributes = True


class UpdateGenresRequest(BaseModel):
    genres: list[str]