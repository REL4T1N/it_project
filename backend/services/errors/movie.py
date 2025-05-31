class MovieAlreadyExistInTable(Exception):
    pass

class MovieNotFoundInTable(Exception):
    pass

class MovieNotFound(Exception):
    pass

class MovieNotFoundInDB(Exception):
    pass

class UnauthorizedKinoPoiskAPI(Exception):
    pass

class ForbiddenKinoPoiskAPI(Exception):
    pass

class GigaChatAnswerError(Exception):
    pass

class GenresCountError(Exception):
    pass