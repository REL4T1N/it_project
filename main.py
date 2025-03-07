from fastapi import FastAPI, Request, HTTPException, Depends, status, Form, Cookie
from fastapi.templating import Jinja2Templates
from fastapi.security import HTTPBasic
from fastapi.responses import Response, RedirectResponse

from sqlalchemy.orm import Session
from sqlalchemy import select
from schemas import LoginUser, RegisterUser
from database import SessionLocal
from models import User
from work_with_user import check_user_in_DB, register_user, update_user_profile, UserNotFound, UsernameAlreadyExistsError, EmailAlreadyExistsError


app = FastAPI()
templates = Jinja2Templates(directory="templates")
security = HTTPBasic()

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()

@app.get("/")
async def index_page(request: Request, user_id: str | None = Cookie(default=None)):
    if user_id:
        try:
            # написать функцию для проверки user_id
            db = SessionLocal()
            user = db.execute(
                select(User).where(User.id == int(user_id))
            ).scalar()
            if user:
                return templates.TemplateResponse("index_auth.html", {"request": request, "user": user})
        
        except Exception as e:
            raise e
        
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/login")
async def index_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/register")
async def index_page(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@app.post("/login")
async def login_post(
    request: Request,
    email: str = Form(...),
    password: str = Form(...)):
    try:
        login_data = LoginUser(email=email, password=password)
        user = check_user_in_DB(login_data.email, login_data.password)
        response = RedirectResponse(url="/", 
                                status_code=status.HTTP_303_SEE_OTHER)
        response.set_cookie(key="user_id", value=str(user.id))
        return response
    
    except UserNotFound:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail="Неверный email или пароль")

@app.post("/register")
async def register_post(request: Request,
                        username: str = Form(...),
                        email: str = Form(...),
                        password:str = Form(...),
                        db: Session = Depends(get_db)):
    try:
        register_data = RegisterUser(email=email, username=username, password=password)
        new_user = register_user(register_data.username, register_data.email, register_data.password)
        response = RedirectResponse(url="/",
                                    status_code=status.HTTP_303_SEE_OTHER)
        response.set_cookie(key="user_id", value=str(new_user.id))
        return response

    except EmailAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Пользователь с таким email уже существует"
        )
    
    except UsernameAlreadyExistsError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким именем уже существует"
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Возникла ошибка при регистарации: {str(e)}"
        )
    
