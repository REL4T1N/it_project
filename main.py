from fastapi import FastAPI
from app.api.endpoints import users, moves
from app.db.database import init_db

app = FastAPI()
init_db()

app.include_router(users.router)
app.include_router(moves.router)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)