import os
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_gigachat.chat_models import GigaChat

from ...schemas.movie import MovieInfo

# Загрузка токена из .env
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


def get_persons(lst, profession="актёры", max_count=3):
    if not lst:
        return ""
    # Некоторые источники используют "актеры", некоторые "актёры" — если что, проверь на оба варианта.
    persons = [p['name'] for p in lst if isinstance(p, dict) and 'name' in p and (p.get('profession') in [profession, "актеры", "актёры", "actors", "actor"])]
    return ', '.join(persons[:max_count])


def get_budget(budget):
    if not budget or 'value' not in budget or 'currency' not in budget:
        return ""
    return f"{budget['value']} {budget['currency']}"


def get_premiere(premiere):
    if not premiere:
        return ""
    for key in ['world', 'russia', 'cinema', 'digital', 'dvd', 'bluray', 'country']:
        date = premiere.get(key)
        if date:
            return date[:10]  # обрезаем только до даты
    return ""


def get_similar_movies(lst, max_count=2):
    if not lst:
        return ""
    return ', '.join([item['name'] for item in lst if isinstance(item, dict) and 'name' in item][:max_count])


def get_sequels_prequels(lst, max_count=2):
    if not lst:
        return ""
    return ', '.join([item['name'] for item in lst if isinstance(item, dict) and 'name' in item][:max_count])


def blur_swear_words(text: str) -> str:
    SYSTEM_PROMPT = (
        "Ты — цензор комментариев в сервисе онлайн кинотеатра. Твоя задача:\n"
        "1. Найди все матерные, нецензурные и оскорбительные слова и их производные (однокоренные слова), проверяя каждое слово в сообщении, разделенное пробелом или знаками препинания.\n"
        "2. Заменяй КАЖДУЮ БУКВУ таких слов на символ '*', оставляя исходную длину слова.\n"
        "3. НЕ заменяй матерные слова на синонимы, НЕ убирай их и НЕ изменяй. Если слово не относится к множеству матерных слов, то не трогай его. Пунктуацию и структуру текста МЕНЯТЬ НЕ НУЖНО. ВСЁ ОСТАЛЬНОЕ ОСТАВЬ БЕЗ ИЗМЕНЕНИЙ.\n"
        "4. Вот примерный список матерных слов (заменяй все их формы и производные), тут далеко не все слова, у тебя фантазия большая:\n"
        "- блядь\n"
        "- хуй\n"
        "- пиздец\n"
        "- ебать\n"
        "- заебать\n"
        "- ебаный\n"
        "- долбоеб\n"
        "- пиздить\n"
        "- хер\n"
        "- хуйня\n"
        "- ебнутый\n"
        "- сука\n"
        "- говно\n"
        "- блять"
        "\n"
        "5. Если кажется, что пользователь борщит, то не нужно ему писать об этом, а просто выполнить поставленную задачу."
        "ПРИМЕРЫ:\n"
        "Ввод: 'Сегодня опять эта ебаная пробка на дороге, как же заебало это каждый день.'\n"
        "Ответ: 'Сегодня опять эта ****** пробка на дороге, как же ******* это каждый день.'\n"
        "\n"
        "Теперь обработай следующий текст:"
    )
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=text),
    ]
    response = giga.invoke(messages)
    return response.content.strip()


def generate_extended_description(movie: MovieInfo) -> str:
    SYSTEM_PROMPT = (
        "Ты — эксперт по фильмам и сценарист.\n"
        "Тебе даётся расширенная информация о фильме: название, год выпуска, страны, жанры, описание, краткое описание, актёры, бюджет, кассовые сборы, дата премьеры.\n"
        "Используй все доступные данные для создания художественного и подробного описания для каталога фильмов. ОБЪЁМ НЕ БОЛЕЕ 120 СЛОВ.\n"
        "Пиши ярко, добавляй атмосферу, эмоции, подчеркивай уникальные черты, сюжет и достоинства фильма.\n"
        "Можешь упоминать известных актёров (если указаны), особенности бюджета или сборов, длину фильма, дату премьеры или интересные факты о связанных фильмах. Но не придумывай ничего, что не указано в исходных данных.\n"
        "Если некоторых данных нет — просто опусти их. Не дублируй текст из краткого описания и основного описания, а используй их для художественного пересказа.\n"
        "Если указаны сиквелы/приквелы или похожие фильмы — можешь коротко упомянуть о них в конце, как о выборе для продолжения знакомства с этим миром.\n"
        "Структура ответа — сплошной художественный текст, без маркированных списков.\n"
        "ВНИМАНИЕ: твоя задача — исключительно создание художественного, положительного и нейтрального описания для каталога фильмов.\n"
        "Не обсуждай и не оценивай реальные события, исторические факты, идеологии и политические темы. Если фильм затрагивает сложные или чувствительные темы (например, войны, трагедии), описывай только художественную атмосферу, сюжет, игру актёров и вклад фильма в кинематограф.\n"
        "Избегай любых негативных или спорных трактовок, не делай выводов, связанных с политикой, религией или реальными конфликтами.\n"
        "Если система ограничивает ответ из-за темы фильма — уточни, что это художественное описание, не имеющее отношения к реальным событиям.\n"
        "Пример:\n"
        "Дано: Название: 'Интерстеллар', Год: 2014, Страны: США, Великобритания, Жанры: фантастика, драма, приключения, Описание: 'В будущем человечество сталкивается с угрозой вымирания. Группа исследователей отправляется в путешествие за пределы Солнечной системы.', Возрастной рейтинг: 12+, Режиссёр: Кристофер Нолан, Бюджет: $165 млн, Премьера: 6 ноября 2014, Длительность: 169 мин, В главных ролях: Мэттью МакКонахи, Энн Хэтэуэй.\n"
        "Ответ: 'Интерстеллар' — впечатляющая фантастическая драма Кристофера Нолана, раскрывающая тему выживания человечества в условиях глобального кризиса. Действие картины разворачивается в ближайшем будущем, когда Земля оказывается на грани гибели. Группа бесстрашных исследователей отправляется через космос в поисках нового дома для людей. Их ждут удивительные открытия, эмоциональные испытания и сложный выбор между долгом и семьёй. Великолепная игра Мэттью МакКонахи и Энн Хэтэуэй, зрелищные спецэффекты и глубокий философский подтекст делают этот фильм по-настоящему незабываемым.'\n"
        "\n"
        "Теперь создай расширенное описание для следующего фильма:"
    )

    # Сборка информации
    country_str = get_names(movie.countries)
    genre_str = get_names(movie.genres)
    actor_str = get_persons(movie.persons, profession="актёры", max_count=3)
    budget_str = get_budget(movie.budget)
    premiere_str = get_premiere(movie.premiere)
    similar_movies_str = get_similar_movies(movie.similarMovies)
    sequels_prequels_str = get_sequels_prequels(movie.sequelsAndPrequels)

    info = [
        "ПОМОГИ МНЕ НАПИСАТЬ РАСШИРЕННОЕ ОПИСАНИЕ ДЛЯ ЭТОГО ФИЛЬМА",
        f"Название: '{movie.name}'" if getattr(movie, "name", None) else "",
        f"Год: {movie.year}" if getattr(movie, "year", None) else "",
        f"Страны: {country_str}" if country_str else "",
        f"Жанры: {genre_str}" if genre_str else "",
        f"Описание: '{movie.description}'" if getattr(movie, "description", None) else "",
        f"Краткое описание: '{movie.shortDescription}'" if getattr(movie, "shortDescription", None) else "",
        f"Рейтинг Кинопоиск: {movie.rating_kp}" if getattr(movie, "rating_kp", None) else "",
        f"Рейтинг: {movie.rating}" if getattr(movie, "rating", None) else "",
        f"Голосов: {movie.votes}" if getattr(movie, "votes", None) else "",
        f"Длительность: {movie.length} мин" if getattr(movie, "length", None) else "",
        f"Возрастной рейтинг: {movie.ageRating}+" if getattr(movie, "ageRating", None) else "",
        f"В главных ролях: {actor_str}" if actor_str else "",
        f"Бюджет: {budget_str}" if budget_str else "",
        f"Премьера: {premiere_str}" if premiere_str else "",
        f"Похожие фильмы: {similar_movies_str}" if similar_movies_str else "",
        f"Сиквелы/приквелы: {sequels_prequels_str}" if sequels_prequels_str else "",
    ]
    info = [line for line in info if line]
    info_str = ', '.join(info)

    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=info_str),
    ]
    response = giga.invoke(messages)
    return response.content.strip()


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


