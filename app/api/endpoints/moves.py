from fastapi import APIRouter
from app.api.schemas.user import MovieResponse
from app.db.database import get_db_connection

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/premiere", response_model=list[MovieResponse])
async def get_premieres(page: int = 1):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    page_size = 20 if page == 1 else 2
    offset = (page - 1) * page_size
    
    cursor.execute(
        """
        SELECT movie_id, title, country, release_date, genre, description, additional_info, poster_url 
        FROM movies 
        ORDER BY release_date ASC 
        LIMIT ? OFFSET ?
        """,
        (page_size, offset)
    )
    movies = cursor.fetchall()
    print(f"DEBUG: Found {len(movies)} movies: {movies}")  # Отладка
    conn.close()
    
    if not movies:
        return []
    
    return [
        MovieResponse(
            movie_id=row[0],
            title=row[1],
            country=row[2],
            release_date=row[3],
            genre=row[4],
            description=row[5],
            additional_info=row[6],
            poster_url=row[7]
        ) for row in movies
    ]