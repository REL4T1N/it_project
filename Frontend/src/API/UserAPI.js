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
    setError(e.message);
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
    setError(e.message);
  }
}

export async function DeleteUser(setUser, setError, user_id) {
  try {
    const response = await fetchWrapper(`/api/users/${user_id}`, {
      method: "DELETE",
    });
    setUser(null);
  } catch (e) {
    setError(e.message);
    return response.message;
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
    setError(e.message);
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
    throw Error(e.message);
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
    throw Error(e.message);
  }
}
export async function GetRecomendationData(setGenres) {
  try {
    const Genres = await fetchWrapper(`/api/recommendations/choose_genres`);
    return setGenres(Genres);
  } catch (e) {
    throw Error(e.message);
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
    throw Error(e.message);
  }
}
