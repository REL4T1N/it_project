class UsernameAlreadyExistsError(Exception):
    pass

class EmailAlreadyExistsError(Exception):
    pass

class UserNotFound(Exception):
    pass

class FilmInDB(Exception):
    pass

class FilmNotFound(Exception):
    pass

class ReviewAlreadyExistsError(Exception):
    pass

class ReviewNotFound(Exception):
    pass

class FilmInWatchlist(Exception):
    pass

class FilmNotFoundInWatchlist(Exception):
    pass

class FilmInWatched(Exception):
    pass

class FilmNotFoundInWatched(Exception):
    pass

class FilmInFavorite(Exception):
    pass

class FilmNotFoundInFavorite(Exception):
    pass