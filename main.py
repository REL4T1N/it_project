from fastapi import FastAPI
from fastapi.security import HTTPBasic
from modulniy.routes.index import router as index_router
from modulniy.routes.users import router as user_router
from modulniy.routes.films import router as film_router
from modulniy.routes.reviews import router as reviews_router


app = FastAPI()
security = HTTPBasic()

app.include_router(index_router)
app.include_router(user_router)
app.include_router(film_router)
app.include_router(reviews_router)


