from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload
from typing import List

from ..models import Review
from ..errors import ReviewNotFound, ReviewAlreadyExistsError


def check_review_in_db(user_id: int, film_id: int, db: Session) -> Review:
    return db.query(Review).filter(Review.user_id == user_id, Review.film_id == film_id).first()


def check_review_id(review_id: int, db: Session) -> Review:
    return db.query(Review).filter(Review.id == review_id).first()


def add_review(user_id: int, film_id: int, rating: int, description: str, db: Session) -> Review:
    try:
        review = check_review_in_db(user_id=user_id, film_id=film_id, db=db)
        if review:
            raise ReviewAlreadyExistsError
        
        new_review = Review(user_id=user_id, film_id=film_id, rating=rating, description=description)
        db.add(new_review)
        db.commit()
        db.refresh(new_review)
        return new_review
    
    except Exception as e:
        db.rollback()
        raise e


def update_review(review_id: int, rating: int, description: str, db: Session) -> Review:
    try:
        review = check_review_id(review_id=review_id, db=db)
        if not review:
            raise ReviewNotFound
        
        review.rating = rating
        review.description = description
        db.commit()
        db.refresh(review)
        return review
    
    except Exception as e:
        db.rollback()
        raise e


def delete_review(review_id: int, db: Session) -> bool:
    try:
        review = check_review_id(review_id=review_id, db=db)
        if not review:
            print(f"Review {review_id} not found")
            raise ReviewNotFound
        db.delete(review)
        db.commit()
        print(f"Review {review_id} deleted successfully")
        return True
    except Exception as e:
        db.rollback()
        print(f"Error deleting review {review_id}: {e}")
        raise e

def get_film_rating(film_id: int,
                    db: Session) -> float:
    try:       
        reviews = db.query(Review).filter(Review.film_id == film_id).all()
        all_ratings = [review.rating for review in reviews]

        if len(all_ratings) != 0:
            return round(float(sum(all_ratings) / len(all_ratings)), 1)
        else:
            return float(0)
        
    except Exception as e:
        raise e


def get_reviews_for_film(film_id: int, db: Session) -> List[Review]:
    try:
        reviews = db.query(Review).options(joinedload(Review.user)).filter(Review.film_id == film_id).all()
        if reviews:
            return reviews
        return []
    
    except Exception as e:
        raise e
    

def get_user_rating(user_id: int, db: Session) -> float:
    try:
        reviews = db.query(Review).filter(Review.user_id == user_id).all()
        all_ratings = [review.rating for review in reviews]

        if len(all_ratings) != 0:
            return round(float(sum(all_ratings) / len(all_ratings)), 1)
        else:
            return float(0)
    
    except Exception as e:
        raise e
    

def get_user_reviews(user_id: int, db: Session) -> List[Review]:
    try:
        reviews = db.query(Review).options(joinedload(Review.film)).filter(Review.user_id == user_id).all()
        if reviews:
            return reviews
        return []
    
    except Exception as e:
        raise e