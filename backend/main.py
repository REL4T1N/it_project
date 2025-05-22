import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .routes.users.user import user_router
from .routes.movies.movie import movie_router
from .routes.reviews.review import review_router
from .routes.movies.other_tables import other_tables_router
from .routes.movies.rec_movie import rec_router

app = FastAPI()

# Настройка CORS для работы с фронтендом
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"],  # Порт Vite по умолчанию
    allow_credentials=True,  # Разрешаем куки
    allow_methods=["*"],  # Разрешаем все HTTP-методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Подключение маршрутов пользователей
app.include_router(user_router)
app.include_router(movie_router)
app.include_router(review_router)
app.include_router(other_tables_router)
app.include_router(rec_router)

# Монтирование статических файлов
static_dir = os.path.join(os.path.dirname(__file__), "static")

# Монтируем статику
app.mount("/", StaticFiles(directory=static_dir, html=True), name="static")