from fastapi import APIRouter, Request, Cookie, HTTPException, status, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.orm import Session
from ..config import templates, templates_auth
from ..database import SessionLocal
from ..dependencies import get_db
from ..models import User
from ..services.user_service import get_user_by_id

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
async def index_page(request: Request, user_id: int | None = Cookie(default=None), db: Session = Depends(get_db)):
    '''
    Страница 1 - переадресация на топ фильмов.
    Сделать вывод данных для вкладов "Страница 1 - Анонсы", "Страница 2 - Топ фильмов",
    "Страница 3 - Премьеры", "Страница 4 - Продолжить просмотр (если авторизован)"
    '''
    try:
        user = get_user_by_id(user_id, db)
        if user:
            return templates_auth.TemplateResponse("index_auth.html", {"request": request, "user":user})
        return templates.TemplateResponse("index.html", {"request": request})
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Непредвиденная ошибка: {str(e)}"
        )