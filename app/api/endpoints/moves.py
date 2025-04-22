from fastapi import APIRouter, Cookie, HTTPException, Depends
from typing import Optional, List
from app.api.schemas.movie import MovieResponse  
from app.api.schemas.user import ReviewCreate, ReviewUpdate, ReviewResponse
from app.db.database import get_db_connection

router = APIRouter(prefix="/movies", tags=["movies"])  

@router.get("/premiere", response_model=List[MovieResponse])
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
    print(f"DEBUG: Found {len(movies)} movies: {movies}")  
    conn.close()
    
    if not movies:
        return []
    
    return [
        MovieResponse(
            movie_id=row["movie_id"],
            title=row["title"],
            country=row["country"],
            release_date=row["release_date"],
            genre=row["genre"],
            description=row["description"],
            additional_info=row["additional_info"],
            poster_url=row["poster_url"]
        ) for row in movies
    ]

@router.get("/{movie_id}/user_review", response_model=ReviewResponse)
async def get_user_review(movie_id: int, user_id: Optional[str] = Cookie(default=None, alias="user_id")):
    if not user_id:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT r.user_id, u.username, r.rating, r.text
            FROM reviews r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.movie_id = ? AND r.user_id = ?
        """, (movie_id, user_id))
        
        review = cursor.fetchone()
        if not review:
            raise HTTPException(status_code=404, detail="Review not found")
            
        return {
            "user_id": review["user_id"],
            "username": review["username"],
            "rating": review["rating"],
            "text": review["text"]
        }
    finally:
        conn.close()

@router.post("/{movie_id}/user_review")
async def create_user_review(movie_id: int, review: ReviewCreate, user_id: Optional[str] = Cookie(default=None, alias="user_id")):
    if not user_id:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("SELECT id FROM reviews WHERE movie_id = ? AND user_id = ?", (movie_id, user_id))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Review already exists")
            
        cursor.execute("""
            INSERT INTO reviews (user_id, movie_id, rating, text)
            VALUES (?, ?, ?, ?)
        """, (user_id, movie_id, review.rating, review.text))
        
        conn.commit()
        return {"message": "Review created successfully"}
    finally:
        conn.close()

@router.patch("/{movie_id}/user_review")
async def update_user_review(movie_id: int, review: ReviewUpdate, user_id: Optional[str] = Cookie(default=None, alias="user_id")):
    if not user_id:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
    
        cursor.execute("SELECT id FROM reviews WHERE movie_id = ? AND user_id = ?", (movie_id, user_id))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Review not found")
            
        updates = []
        values = []
        
        if review.rating is not None:
            updates.append("rating = ?")
            values.append(review.rating)
        if review.text is not None:
            updates.append("text = ?")
            values.append(review.text)
            
        if not updates:
            raise HTTPException(status_code=400, detail="No fields to update")
            
        values.extend([movie_id, user_id])
        query = f"UPDATE reviews SET {', '.join(updates)} WHERE movie_id = ? AND user_id = ?"
        
        cursor.execute(query, values)
        conn.commit()
        return {"message": "Review updated successfully"}
    finally:
        conn.close()

@router.delete("/{movie_id}/user_review")
async def delete_user_review(movie_id: int, user_id: Optional[str] = Cookie(default=None, alias="user_id")):
    if not user_id:
        raise HTTPException(status_code=401, detail="User not authenticated")
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM reviews WHERE movie_id = ? AND user_id = ?", (movie_id, user_id))
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Review not found")
            
        conn.commit()
        return {"message": "Review deleted successfully"}
    finally:
        conn.close()

@router.get("/{movie_id}/reviews", response_model=List[ReviewResponse])
async def get_all_reviews(movie_id: int, user_id: Optional[str] = Cookie(default=None, alias="user_id")):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        
        query = """
            SELECT r.user_id, u.username, r.rating, r.text
            FROM reviews r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.movie_id = ?
        """
        params = [movie_id]
        
        if user_id:
            query += " AND r.user_id != ?"
            params.append(user_id)
            
        cursor.execute(query, params)
        
        reviews = [{
            "user_id": review["user_id"],
            "username": review["username"],
            "rating": review["rating"],
            "text": review["text"]
        } for review in cursor.fetchall()]
        
        return reviews
    finally:
        conn.close()