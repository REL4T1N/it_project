from sqlalchemy.orm import Session
from ...models import Movie


def checkMovieInDB(kp_id: int, db: Session) -> Movie | None:
    return db.query(Movie).filter(Movie.kp_id == kp_id).first()


def addMovie(movie_data: dict, db: Session) :
    try:
        movie = Movie(
            kp_id=movie_data['id'],
            name=movie_data.get('name'),
            year=movie_data.get('year'),
            description=movie_data.get('description'),
            shortDescription=movie_data.get('shortDescription'),
            rating=movie_data['rating']['kp'] if movie_data.get('rating') else None,
            votes=movie_data['votes']['kp'] if movie_data.get('votes') else None,
            movieLength=movie_data.get('movieLength'),
            ageRating=movie_data.get('ageRating'),
            poster=movie_data['poster']['url'] if movie_data.get('poster') else None,
            backdrop=movie_data['backdrop']['url'] if movie_data.get('backdrop') else None,
            genres=movie_data.get('genres'),
            countries=movie_data.get('countries'),
            persons=movie_data.get('persons'),
            premiere=movie_data.get('premiere'),
            budget=movie_data.get('budget'),
            fees=movie_data.get('fees'),
            similarMovies=movie_data.get('similarMovies'),
            sequelsAndPrequels=movie_data.get('sequelsAndPrequels'),  
            watchability=movie_data.get('watchability'),
        )

        db.add(movie)
        db.commit()
        db.refresh(movie)
        return movie
    except Exception as e:
        db.rollback()
        raise e