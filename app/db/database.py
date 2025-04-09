import sqlite3
from app.core.config import settings

def get_db_connection():
    return sqlite3.connect(settings.DATABASE_URL)

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            description TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS movies (
            movie_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            country TEXT NOT NULL,
            release_date TEXT NOT NULL,
            genre TEXT NOT NULL,
            description TEXT,
            additional_info TEXT,
            poster_url TEXT
        )
    ''')
    
    conn.commit()
    conn.close()