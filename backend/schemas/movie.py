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


class FindMovie(BaseModel):
    movie_name: Optional[str] = None
    year_start: Optional[int] = Field(ge=1850, le=2100, default=None)
    year_end: Optional[int] = Field(ge=1850, le=2100, default=None)
    rating_kp_start: Optional[int] = Field(ge=0, le=10, default=None)
    rating_kp_end: Optional[int] = Field(ge=0, le=10, default=None)
    votes_start: Optional[int] = Field(default=None, ge=0, le=10000000)
    votes_end: Optional[int] = Field(default=None, ge=0, le=10000000)
    length_min: Optional[int] = Field(default=None, ge=0, le=500000)
    length_max: Optional[int] = Field(default=None, ge=0, le=500000)
    ageRating_min: Optional[int] = Field(default=None, ge=0, le=115)
    ageRating_max: Optional[int] = Field(default=None, ge=0, le=115)
    genres: Optional[list[str]] = Field(None)
    countries: Optional[list[str]] = Field(None)