import requests
import os
from dotenv import load_dotenv

from ..errors.movie import MovieNotFound, Unauthorized, Forbidden

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path=dotenv_path)

API_token = os.getenv("API_token")
headers = {
    "X-API-KEY": API_token,
    "Accept": "application/json"
}


def getApiMovie(kp_id: int) -> dict | None:
    url = f"https://api.kinopoisk.dev/v1.4/movie/{kp_id}"
    response = requests.get(url=url, headers=headers)
    status = response.status_code
    if status == 200:    
        data = response.json()
        return data
    elif status == 401:
        raise Unauthorized
    elif status == 403:
        raise Forbidden
    elif status == 404:
        raise MovieNotFound
    else: 
        raise Exception(f"Unexpected status code {status}: {response.text}")