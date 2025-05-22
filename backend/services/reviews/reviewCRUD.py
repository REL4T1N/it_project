from sqlalchemy.orm import Session
from typing import Optional

from ...models import Review
from ...schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse
from ..errors.review import ReviewNotFound, ReviewAlreadyExist, ReviewRatingError

def search_review_data(user_id: int, kp_id: int, db: Session) -> Review | None:
    return db.query(Review).filter(Review.user_id == user_id, Review.kp_id == kp_id).first()


def add_review(user_id: int, kp_id: int, review_data: ReviewCreate, db: Session) -> ReviewResponse:
    try:
        review = search_review_data(user_id, kp_id, db)
        if review:
            raise ReviewAlreadyExist
        
        if (0 <= review_data.rating <= 10) == False:
            raise ReviewRatingError

        new_review = Review(
            user_id=user_id,
            kp_id=kp_id,
            rating=review_data.rating,
            text=review_data.text
        )
        db.add(new_review)
        db.commit()
        db.refresh(new_review)
        return ReviewResponse.model_validate(new_review)
    
    except Exception as e:
        db.rollback()
        raise e
    

def update_review(user_id: int, kp_id: int, db: Session, review_data: ReviewUpdate) -> ReviewResponse:
    try:
        review = search_review_data(user_id, kp_id, db)
        if review is None:
            raise ReviewNotFound
        
        if review_data.rating is not None:
            if (0 <= review_data.rating <= 10) == False:
                raise ReviewRatingError
            review.rating = review_data.rating
        
        if review_data.text is not None:
            review.text = review_data.text

        db.commit()
        db.refresh(review)
        return ReviewResponse.model_validate(review)
    
    except Exception as e:
        db.rollback()
        raise e


def delete_review(user_id: int, kp_id: int, db: Session) -> ReviewResponse:
    try:
        review = search_review_data(user_id, kp_id, db)
        if review is None:
            raise ReviewNotFound
        
        db.delete(review)
        db.commit()
        return ReviewResponse.model_validate(review)

    except Exception as e:
        db.rollback()
        raise e


def movie_reviews(kp_id: int, exclude_user_id: Optional[int], db: Session) -> list[ReviewResponse]:
    query = db.query(Review).filter(Review.kp_id == kp_id)
    if exclude_user_id:
        query = query.filter(Review.user_id != exclude_user_id)

    reviews = query.all()
    return [ReviewResponse.model_validate(review) for review in reviews]


def user_reviews(user_id: int, db: Session) -> list[ReviewResponse]:
    reviews = db.query(Review).filter(Review.user_id == user_id).all()
    return [ReviewResponse.model_validate(review) for review in reviews]




