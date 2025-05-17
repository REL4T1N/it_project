from fastapi import APIRouter, Depends, Cookie, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional


from ...database import get_db
from ...schemas.movie import ListMovieInfo
from ...schemas.user import UserRecommendation
from ...services.movies.rec_movies import addUserGenres, userRecommendation, genresList
from ...schemas.movie import UpdateGenresRequest
from ...services.errors.user import UserNotFound

rec_router = APIRouter("/api/recommendations", tags=["Reccomendations"])

@rec_router.get("/me", response_model=list[ListMovieInfo])
async def getUserRec(
    user_id: int, #добавить cookie
    # user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    db: Session = Depends(get_db)
) -> list[ListMovieInfo]:
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизоване")
    try:
        movies = userRecommendation(user_id=user_id, db=db, N=20)
        return movies

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Непредвиденная ошибка {e}")
    

@rec_router.get("/choose_genres")
async def getGenres(db: Session = Depends(get_db)):
    return genresList(db=db)


@rec_router.post("/me/genres")
async def setUserGenres(
    user_id: int, #добавить cookie
    # user_id: Optional[int] = Cookie(default=None, alias="user_id"),
    request: UpdateGenresRequest,
    db: Session = Depends(get_db)
):
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Пользователь не авторизоване")

    answer = addUserGenres(user_id=user_id, new_genres=request.genres, db=db)
    if answer:
        return {"message": "Жанры добавлены"}
    return {"message": "Жанры не добавлены"}