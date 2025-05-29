import os
import re
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_gigachat.chat_models import GigaChat

from ...schemas.movie import MovieInfo

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


def recommend_movies(user_genres, user_liked_movies) -> str:
    SYSTEM_PROMPT = (
        "Ты — рекомендательный сервис по фильмам. Пользователь указал интересные для него жанры и несколько фильмов, которые ему понравились. "
        "На основе этих данных предложи 5–7 других фильмов, которые могут его заинтересовать. Для каждого фильма укажи короткое обоснование, почему он подходит. "
        "Не повторяй уже указанные фильмы. Указывай только реально существующие фильмы. Пиши только список с пояснениями, без лишних вступлений.\n"
        "\n"
        "Пример:\n"
        "Жанры: фантастика, приключения\n"
        "Понравившиеся фильмы: 'Интерстеллар', 'Гравитация'\n"
        "Ответ:\n"
        "1. 'Марсианин' — фильм о выживании на Марсе, сочетающий научную фантастику и элементы драмы.\n"
        "2. 'Контакт' — исследование космоса и встречи с внеземной жизнью.\n"
        "3. 'Начало' — оригинальная фантастика с захватывающим сюжетом.\n"
        "4. 'Пассажиры' — история о путешествии на звёздном корабле и человеческих отношениях.\n"
        "5. 'Сквозь снег' — динамичный фантастический триллер о выживании в постапокалиптическом мире.\n"
        "\n"
        "Теперь предложи фильмы по следующим данным:"
    )
    data = (
        f"Жанры: {', '.join(user_genres)}\n"
        f"Понравившиеся фильмы: {', '.join(user_liked_movies)}"
    )
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=data),
    ]
    response = giga.invoke(messages)
    return response.content.strip()


def generate_summary_gigachat(movie: MovieInfo):
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
    return remove_markdown(response.content.strip())

def remove_markdown(text):
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)  # **жирный**
    text = re.sub(r'\*(.*?)\*', r'\1', text)      # *курсив*
    text = re.sub(r'_([^_]+)_', r'\1', text)      # _курсив_
    text = re.sub(r'^#+\s', '', text, flags=re.MULTILINE)  # заголовки
    text = re.sub(r'^>\s', '', text, flags=re.MULTILINE)   # цитаты
    return text.strip()