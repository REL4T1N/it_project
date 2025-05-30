from fastapi import APIRouter, status, HTTPException, Depends, Cookie
from sqlalchemy.orm import Session
from typing import Optional

from ...database import get_db
from ...services.reviews.reviewCRUD import add_review, search_review_data, update_review, delete_review, movie_reviews, user_reviews
from ...schemas.review import ReviewResponse, ReviewCreate, ReviewUpdate
from ...services.errors.review import ReviewAlreadyExist, ReviewNotFound, ReviewRatingError

review_router = APIRouter(prefix="/api/reviews", tags=["Review"])


@review_router.get("/{movie_id}", response_model=ReviewResponse)
async def getReview(
    movie_id: int,
    user_id: int = Cookie(default=None, alias="user_id"),
    db: Session = Depends(get_db)
) -> ReviewResponse:
    try:
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Пользователь не авторизован")
        review = search_review_data(user_id, movie_id, db)

        if review.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="user_id не совпадают")

        if review is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Отзыв не найден")
        
        return ReviewResponse.model_validate(review)
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@review_router.get("/movies/{movie_id}", response_model=list[ReviewResponse])
async def getMovieReviews(
    movie_id: int,
    user_id: Optional[int] = Cookie(defaul=None, alias="user_id"),
    db: Session = Depends(get_db)
) -> list[ReviewResponse]:
    try:   
        reviews = movie_reviews(kp_id=movie_id, exclude_user_id=user_id, db=db)
        if not reviews:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Ревью не найдены для этого фильма")
        
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@review_router.get("/users/{user_id}", response_model=list[ReviewResponse])
async def getUserReviews(
    user_id: int,
    db: Session = Depends(get_db)
) -> list[ReviewResponse]:
    try:
        reviews = user_reviews(user_id=user_id, db=db)
        if not reviews:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail="Ревью не найдены для этого пользователя")
        
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")
    

@review_router.post("/{movie_id}/me", response_model=ReviewResponse)
async def createUserReview(
    movie_id: int,
    review_data: ReviewCreate,
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    db: Session = Depends(get_db)
) -> ReviewResponse:
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")
    
    try:
        review = add_review(user_id=user_id, kp_id=movie_id, review_data=review_data, db=db)
        if review.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Доступ запрещён")
        return review
    
    except ReviewAlreadyExist:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                             detail="Отзыв уже существует")
    
    except ReviewRatingError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Некорректное значение rating = {review_data.rating}")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@review_router.patch("/{movie_id}", response_model=ReviewResponse)
async def updateUserReview(
    movie_id: int,
    review_data: ReviewUpdate,
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    db: Session = Depends(get_db)
) -> ReviewResponse:
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")
    
    try:
        review = update_review(user_id=user_id, kp_id=movie_id, review_data=review_data, db=db)
        if review.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Доступ запрещён")
        return review
        
    except ReviewNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Отзыв не найден")
    
    except ReviewRatingError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"Неверное значение rating = {review_data.rating}")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")


@review_router.delete("/{movie_id}")
async def deleteUserReview(
    movie_id: int,
    user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    db: Session = Depends(get_db)
) -> dict:
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизован")
    
    try:
        review = delete_review(user_id=user_id, kp_id=movie_id, db=db)
        if review.user_id != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Доступ запрещён")
        if review:  
            return {"message": "Отзыв удален"}
        else:
            return {"message": "Отзыва не удален"}
        
    except ReviewNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Отзыв не найден")
    
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")