from pydantic import BaseModel
from typing import Optional

class MovieResponse(BaseModel):
    movie_id: int
    title: str
    country: str
    release_date: str
    genre: str
    description: Optional[str] = None
    additional_info: Optional[str] = None
    poster_url: Optional[str] = None