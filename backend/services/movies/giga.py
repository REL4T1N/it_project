import os
import re
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_gigachat.chat_models import GigaChat

from ...schemas.movie import MovieInfo
from ..errors.movie import GigaChatAnswerError

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path=dotenv_path)
GIGACHAT_TOKEN = os.getenv("GIGACHAT_token")

giga = GigaChat(
    credentials=GIGACHAT_TOKEN,
    verify_ssl_certs=False,
)


def get_names(lst):
    if not lst:
        return ""
    return ', '.join([item['name'] for item in lst if isinstance(item, dict) and 'name' in item])


def generate_summary_gigachat(movie: MovieInfo):
    try:
        country_str = get_names(movie.countries)
        genre_str = get_names(movie.genres)
        SYSTEM_PROMPT = (
            f"Название: {movie.name}\n"
            f"Год: {movie.year}\n"
            f"Страны: {genre_str}\n"
            f"Жанры: {country_str}\n"
            f"Описание: {movie.description}\n"
            f"Возрастной рейтинг: {movie.ageRating}+\n\n"
            f"Сгенерируй, пожалуйста, краткое содержание сюжета этого фильма. "
            f"Сделай его интересным, логичным и подробным. НУЖНО ТОЛЬКО СОДЕРЖАНИЕ, БЕЗ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ ПО ФИЛЬМУ. "
            f"Пиши только краткое содержание, без названий фильма, года выпуска, страны, жанров, описания и возрастного рейтинга"
        )
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
        ]
        response = giga.invoke(messages)
        if not response:
            raise GigaChatAnswerError
        return remove_markdown(response.content.strip())

    except Exception as e:
        raise e


def remove_markdown(text):
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)  # **жирный**
    text = re.sub(r'\*(.*?)\*', r'\1', text)      # *курсив*
    text = re.sub(r'_([^_]+)_', r'\1', text)      # _курсив_
    text = re.sub(r'^#+\s', '', text, flags=re.MULTILINE)  # заголовки
    text = re.sub(r'^>\s', '', text, flags=re.MULTILINE)   # цитаты
    return text.strip()


def recommend_movies_gigachat(preferred_genres, liked_movies):
    try:
        genres_text = get_names(preferred_genres)
        liked_text = ', '.join(movie.name for movie in liked_movies)

        SYSTEM_PROMPT = (
            f"Пользователю нравятся жанры: {genres_text}.\n"
            f"Ему уже понравились фильмы: {liked_text}.\n\n"
            f"На основе этой информации составь список из как минимум 20 фильмов, "
            f"которые могут ему понравиться. Укажи только названия фильмов, без описаний. "
            f"Не используй Markdown или форматирование — просто список названий через запятую или с новой строки."
        )

        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
        ]
        response = giga.invoke(messages)
        if not response:
            raise GigaChatAnswerError
        return remove_markdown(response.content.strip())

    except Exception as e:
        raise e
