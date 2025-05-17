from sqlalchemy.orm import Session
from typing import Optional

from ...models import Review
from ...schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse
from ..errors.review import ReviewNotFound, ReviewAlreadyExist

def getReview(review_id: int, db: Session) -> Optional[Review]:
    return db.query(Review).filter(Review.id == review_id).first()
    

def addReview(
        movie_id: int,
        user_id: int,
        review_data: ReviewCreate,
        db: Session
    ) -> ReviewResponse:
    try:
        review = db.query(Review).filter(
            Review.user_id == user_id, Review.movie_id == movie_id
        ).first()
        if review is not None:
            raise ReviewAlreadyExist
        
        if not 0 <= review_data.rating <= 10:
            raise ValueError

        new_review = Review(
            user_id=user_id,
            movie_id=movie_id,
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


def updateReview(
        review_id: int,
        update_data: ReviewUpdate,
        db: Session
    ) -> ReviewResponse:
    try:
        review = getReview(review_id=review_id, db=db)
        if review is None:
            raise ReviewNotFound
        
        if update_data.rating is not None:
            if not 0 <= update_data.rating <= 10:
                raise ValueError
            review.rating = update_data.rating
        
        if update_data.text is not None:
            review.text = update_data.text

        db.commit()
        db.refresh(review)
        return ReviewResponse.model_validate(review)
    
    except Exception as e:
        db.rollback()
        raise e
    

def deleteReview(review_id: int, db: Session) -> ReviewResponse:
    try:
        review = getReview(review_id=review_id, db=db)
        if review is None:
            raise ReviewNotFound
        db.delete(review)
        db.commit()
        return ReviewResponse.model_validate(review)

    except Exception as e:
        db.rollback()
        raise e


def movieReviews(movie_id: int, exclude_user_id: Optional[int], db: Session) -> list[ReviewResponse]:
    query = db.query(Review).filter(Review.movie_id == movie_id)
    if exclude_user_id is not None:
        query = query.filter(Review.user_id != exclude_user_id)

    reviews = query.all()
    return [ReviewResponse.model_validate(review) for review in reviews]
    

def userReviews(user_id: int, db: Session) -> list[ReviewResponse]:
    reviews = db.query(Review).filter(Review.user_id == user_id).all()
    return [ReviewResponse.model_validate(review) for review in reviews]



