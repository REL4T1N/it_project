import requests
import os
from dotenv import load_dotenv

from ..errors.movie import MovieNotFound, UnauthorizedKinoPoiskAPI, ForbiddenKinoPoiskAPI

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path=dotenv_path)

API_token = os.getenv("API_token")
headers = {
    "X-API-KEY": API_token,
    "Accept": "application/json"
}


def getApiMovie(kp_id: int) -> dict | None:
    try:
        url = f"https://api.kinopoisk.dev/v1.4/movie/{kp_id}"
        response = requests.get(url=url, headers=headers)
        status = response.status_code
        if status == 200:    
            data = response.json()
            return data
        elif status == 401:
            raise UnauthorizedKinoPoiskAPI
        elif status == 403:
            raise ForbiddenKinoPoiskAPI
        elif status == 404:
            raise MovieNotFound

    except Exception as e:
        raise e