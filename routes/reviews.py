from fastapi import APIRouter, Depends, HTTPException, Cookie, status, Request, Form
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from ..models import User, Film, Review
from ..config import templates, templates_auth
from ..dependencies import get_db
from ..services.review_service import ReviewNotFound, ReviewAlreadyExistsError, check_review_in_db, add_review, update_review, delete_review
from ..services.user_service import get_user_by_id, UserNotFound

router = APIRouter() 

@router.post("/films/{film_id}/review/{user_id}")
async def add_review_web(request: Request,
                         film_id: int,
                         user_id: int, 
                         rating: int = Form(...),
                         description: str | None = Form(default=None),
                         db: Session = Depends(get_db)
                         ):
    try:       
        new_review = add_review(user_id=user_id, film_id=film_id, rating=rating, description=description, db=db)
        return RedirectResponse(url=f"/films/{film_id}", status_code=status.HTTP_303_SEE_OTHER)

    except ReviewAlreadyExistsError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Отзыв уже есть")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")

@router.post("/films/{film_id}/review/{review_id}/update")
async def update_review_web(request: Request,
                            film_id: int,
                            review_id: int,
                            rating: int = Form(...),
                            description: str | None = Form(default=None),
                            db: Session = Depends(get_db)
                            ):
    try:       
        updated_review = update_review(review_id=review_id, rating=rating, description=description, db=db)
        return RedirectResponse(url=f"/films/{film_id}", status_code=status.HTTP_303_SEE_OTHER)

    except ReviewNotFound:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Отзыв не найден")

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")

@router.post("/films/{film_id}/review/{review_id}/delete")
async def delete_review_web(request: Request,
                            film_id: int,
                            review_id: int,
                            db: Session = Depends(get_db)
                            ):
    try:
        if (delete_review(review_id=review_id, db=db)):
            print("Deletion successful")
            return RedirectResponse(url=f"/films/{film_id}", status_code=status.HTTP_303_SEE_OTHER)
            
    except ReviewNotFound:
        print("Review not found")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Отзыв не найден")

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Произошла непредвиденная ошибка {e}")