class User:
    table_name = "users"
    fields = ["user_id", "email", "username", "password", "description"]

class Movie:
    table_name = "movies"
    fields = ["movie_id", "title", "country", "release_date", "genre", "description", "additional_info", "poster_url"]

class Review:
    table_name = "reviews"
    fields = ["id", "user_id", "movie_id", "rating", "text"]