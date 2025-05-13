import requests
from .errors import MovieNotFound, Unauthorized, Forbidden

API_TOKEN = "DTP33ZA-S594953-G2TT3VY-0BMB9SP"
headers = {
    "X-API-KEY": API_TOKEN,
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
        raise Exception