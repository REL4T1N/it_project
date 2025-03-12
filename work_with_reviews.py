from sqlalchemy import select
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Review
from errors import ReviewAlreadyExistsError

def add_review(user_id: int | None = None, 
               film_id: int | None = None, 
               rating: str | None = None, 
               description: str | None = None):
    db: Session = SessionLocal()
    if user_id and film_id and rating:
        try:
            review = db.execute(
                select(Review).where(Review.user_id == user_id, Review.film_id == film_id)
            ).scalar_one_or_none()
            if review:
                raise ReviewAlreadyExistsError
            
            new_review = Review(user_id=user_id, 
                                film_id=film_id, 
                                rating=rating, 
                                description=description)
            db.add(new_review)
            db.commit()
            db.refresh(new_review)

        except Exception as e:
            db.rollback()
            raise e
        
        finally: 
            db.close()


def get_reviews_for_film(film_id: int | None = None):
    db: Session = SessionLocal()
    try:
        reviews = db.query(Review).filter(Review.film_id == film_id).all()
        if reviews:
            return reviews
        return []
    finally:
        db.close()

def get_film_rating(film_id: int | None = None):
    db: Session = SessionLocal()
    try:
        reviews = db.query(Review).filter(Review.film_id == film_id).all()
        all_rating = []
        for review in reviews:
            all_rating.append(review.rating)
        if len(all_rating) != 0:
            return round(float(sum(all_rating) / len(all_rating)), 1)
        else:
            return float(0)
        
    except Exception as e:
        raise e
    finally:
        db.close()

def get_reviews_for_user(user_id: str | None = None):
    db: Session = SessionLocal()
    try:
        reviews = db.query(Review).filter(Review.user_id == user_id).all()
        if reviews:
            return reviews
        return []
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()


