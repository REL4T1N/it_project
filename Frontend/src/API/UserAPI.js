// Я мог сделать шаблон get и post функции сэкономив еще 200 строк, но уже было слишком поздно...
import { fetchWrapper } from "./fetchWrapper";
import { useNavigate } from "react-router-dom";
export async function UserRegistration(data) {
  return fetchWrapper("/api/users", { method: "POST", body: data });
}
export async function UserLogin(data) {
  return fetchWrapper("/api/users/login", { method: "POST", body: data });
}
export async function fetchUser(setUser, setError) {
  try {
    const userData = await fetchWrapper("/api/users/me");
    setUser(userData);
  } catch (e) {
    if (e.status != 401){
      throw e;
    }
  }
}
export async function GetAnotherUser(setAnotherUser, user_id){
  try{
    const user = fetchWrapper(`/api/users/${user_id}`);
    setAnotherUser(user);
  } catch(e){
    throw Error(e.message)
  }
}
export async function ChangeUserInfo(data, setUser, setError, user_id) {
  try {
    const new_user = await fetchWrapper(`/api/users/${user_id}`, {
      method: "POST",
      body: data,
    });
    setUser(new_user);
  } catch (e) {
    throw Error(e.message);
  }
}

export async function DeleteUser(setUser, user_id) {
  try {
    const response = await fetchWrapper(`/api/users/${user_id}`, {
      method: "DELETE",
    });
    setUser(null);
  } catch (e) {
    throw e;
  }
}
export async function EditUser(user_id, bodyan, setUser) {
  try {
    const response = await fetchWrapper(`/api/users/${user_id}`, {method:'PUT', body:bodyan})
    setUser(response)
  } catch (e){
    throw e;
  }
}
export async function Logout(setUser, setError) {
  try {
    const response = await fetchWrapper(`/api/users/logout`, {
      method: "POST",
    });
    setUser(null);
    return response.message;
  } catch (e) {
    throw Error(e.message);
  }
}
export async function GetFilmData(movie_id, setFilmData) {
  try {
    const FilmData = await fetchWrapper(`/api/movies/${movie_id}`);
    setFilmData(FilmData);
  } catch (e) {
    throw Error(e.message);
  }
}
export async function GetReviewData(movie_id, setReviewData) {
  try {
    const Review = await fetchWrapper(`/api/reviews/movies/${movie_id}`);
    setReviewData(Review);
  } catch (e) {
    if (e.status != 404)
    throw e;
  }
}
export async function GetUserReviewData(user_id, setReviewData) {
  try {
    const Review = await fetchWrapper(`/api/reviews/users/${user_id}`);
    setReviewData(Review);
  } catch (e) {
    if (e.status != 404)
    throw e;
  }
}
export async function EditReviewData(data, movie_id){
  try {
    const Review = await fetchWrapper(`/api/reviews/${movie_id}`, {
      method: "PATCH",
      body: data,
    });
  } catch (e) {
    throw e;
  }
}

export async function SendReviewData(data, movie_id) {
  try {
    const Review = await fetchWrapper(`/api/reviews/${movie_id}/me`, {
      method: "POST",
      body: data,
    });
  } catch (e) {
    throw Error(e.message);
  }
}
export async function DeleteReviewData(movie_id) {
  try {
    await fetchWrapper(`/api/reviews/${movie_id}`, {
      method: "DELETE"
    });
  } catch (e) {
    throw Error(e.message);
  }
}
export async function GetTable(movie_id, setIsTable, table) {
  try {
    const IsTable = await fetchWrapper(`/api/tables/${movie_id}/${table}`);
    console.log(IsTable.message);
    if (
      IsTable.message === "Фильма нет в избранном" ||
      IsTable.message === 'Фильма нет в категории "Просмотернно"' ||
      IsTable.message === 'Фильма нет в категории "Буду смотреть"'
    ) {
      setIsTable(false);
    } else {
      setIsTable(true);
    }
  } catch (e) {
    throw Error(e.message);
  }
}
export async function MakeTable(movie_id, table, state) {
  try {
    if (!state) {
      const response = await fetchWrapper(`/api/tables/${movie_id}/${table}`, {
        method: "POST",
      });
    } else {
      const response = await fetchWrapper(`/api/tables/${movie_id}/${table}`, {
        method: "DELETE",
      });
    }
  } catch (e) {
    throw e;
  }
}
export async function GetRecomendationData(setGenres) {
  try {
    const Genres = await fetchWrapper(`/api/recommendations/choose_genres`);
    return setGenres(Genres);
  } catch (e) {
    throw e;
  }
}
export async function SendRecomendationData(selectedGenres, user_id) {
  try {
    const response = await fetchWrapper(
      `/api/recommendations/me/genres?user_id=${user_id}`,
      { method: "POST", body: { genres: selectedGenres } },
    );
    return response;
  } catch (e) {
    throw e;
  }
}
export async function GetUserTable(setUserTable, table_name){
  try {
    const table = await fetchWrapper(`/api/tables/users/${table_name}`);
    setUserTable(table);
  } catch (e) {
    throw e;
  }
}
export async function GetPremiere(setPremiere){
  try {
    const premiere = await fetchWrapper('/api/movies/top_cinema_movie');
    setPremiere(premiere)
  } catch(e) {
    throw e;
  }
}
export async function GetNew(setNew_movie){
  try {
    const new_movie = await fetchWrapper('/api/movies/cinema_movies');
    setNew_movie(new_movie)
  } catch(e) {
    throw e;
  }
}
export async function GetRecMovies(setRecMovies){
  try {
    const movies = await fetchWrapper('/api/recommendations/me');
    setRecMovies(movies)
  } catch(e) {
    throw e;
  }
}
export async function GetTops(setTops){
  try {
    const movies = await fetchWrapper('/api/movies/top/');
    setTops(movies)
  } catch(e) {
    throw e;
  }
}
export async function GetAITops(setTops){
  try {
    const movies = await fetchWrapper('/api/recommendations/giga');
    setTops(movies)
  } catch(e) {
    throw e;
  }
}
export async function SendSearch(params, setResult){
  try {
    const ageMass = encodeURIComponent(JSON.stringify(params[7]))
    const genreMass= encodeURIComponent(JSON.stringify(params[8]))
    const countriesMass = encodeURIComponent(JSON.stringify(params[9]))
    console.log(params)
    const movies = await fetchWrapper(`/api/movies/find_movies?movie_name=${params[0]}`)
    setResult(movies)
  } catch (e) {
    throw e;
  }
}
///api/movies/find_movies?movie_name=${params[0]}&year_start=${params[1]}&year_end=${params[2]}&rating_kp_start=${params[3]}&rating_kp_end=${params[4]}&length_min=${params[5]}&length_max=${params[6]}`)