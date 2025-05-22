import { Rewind } from "lucide-react";
import { fetchWrapper } from "./fetchWrapper";

export async function UserRegistration(data) {
    return fetchWrapper('/api/users', {method: 'POST', body: data});
}
export async function UserLogin(data) {
    return fetchWrapper('/api/users/login', {method: 'POST', body: data});
}
export async function fetchUser(setUser, setError){
    try {
        const userData = await fetchWrapper('/api/users/me');
        setUser(userData);
    }
    catch (e) {
        setError(e.message);
    }
}

export async function ChangeUserInfo(data, setUser, setError, user_id) {
    try {
        const new_user =  await fetchWrapper(`/api/users/${user_id}`, {method : 'POST', body : data});
        setUser(new_user);
    }
    catch (e) {
        setError(e.message);
    }
}

export async function DeleteUser(setUser, setError, user_id){
    try{
        const response = await fetchWrapper(`/api/users/${user_id}`, {method:'DELETE'});
        setUser(null);
    } catch (e) {
        setError(e.message);
        return response.message;
    }
}
export async function Logout(setUser, setError, user_id){
    try{
        const response = await fetchWrapper(`/api/users/${user_id}`, {method:'POST'});
        setUser(null);
        return response.message;
    } catch (e) {
        setError(e.message);
    }
}
export async function GetFilmData(movie_id, setFilmData, setError){
    try {
        const FilmData = await fetchWrapper(`/api/movies/${movie_id}`);
        setFilmData(FilmData);
    }
    catch (e){
        setError(e)
    }
}
export async function GetReviewData(movie_id, setReviewData, setError){
    try {
        const Review = await fetchWrapper(`/api/reviews/movies/${movie_id}`);
        setReviewData(Review);
    }
    catch (e){
        setError(e)
    }
}
export async function SendReviewData(data, movie_id, setError){
    try {
        const Review = await fetchWrapper(`/api/reviews/${movie_id}/me`, {method:'POST', body: data});
    }
    catch (e){
        setError(e)
    }
}