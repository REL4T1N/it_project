import { useContext } from "react";
import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Button from "../components/buttons/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Logout, GetAnotherUser, GetUserTable, GetUserReviewData, DeleteUser, EditUser } from "../API/UserAPI";
import { UserContext } from "../context/UserContext";
import UnauthorizedPage from "../components/UnathorizedPage";
import ErrorPage from "../components/ErrorPage";
import CardScroller from "../components/CardScroller/CardScroller";
import LoadingPage from "./LoadingPage";
import styles from "../styles/filmpage.module.css";
import ReviewPost from "../components/review/ReviewPost";
const User = () => {
  const {user_id} = useParams();
  const { user, setUser } = useContext(UserContext);
  const [anotherUser, setAnotherUser] = useState(null);
  const [favourite, setFavourite] = useState(null);
  const [watched, setWatched] = useState(null);
  const [future, setFuture] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReview] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPassword, setEditPassword] = useState("")
  const navigate = useNavigate();

  const startEditing = () => {
    setEditUsername(user?.username || "");
    setEditEmail(user?.email || "");
    setEditDescription(user?.user_description || "");
    setIsEditing(true);
  };
   const saveChanges = async () => {
    try{
    const new_user = {username: editUsername, email: editEmail, user_description:editDescription, password:editPassword}
    await EditUser(user?.id, new_user, setUser)
    setIsEditing(false);
    } catch (e) {
      setError(e);
      setIsEditing(false);
    }
   }
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        Promise.all([
          GetUserTable(setFavourite, "favorite_movies"),
          GetUserTable(setWatched, "watched_movies"),
          GetUserTable(setFuture, "watch_list_movies"),
          GetAnotherUser(setAnotherUser, user_id),
          GetUserReviewData(user_id, setReview),
        ]);
        setIsLoading(false);
      } catch(e) {
        setError(e.message);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  if (isLoading) {
    return <LoadingPage/>
  }
  if (!user) {
    return <UnauthorizedPage />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Header />
      <div className="py-[100px]">
        <div className="h-[90%] flex px-[7%] items-start justify-center space-x-[7%]">
          <div className="flex grid-cols-2">
            {user?.id != anotherUser?.id &&(
              <>
            <div className="max-w-[820px] min-w-[820px] w-full  p-10 bg-[#1A1A1A] rounded-2xl shadow-lg flex flex-col gap-4">
              <div className="flex flex-col gap-5">
                {/* Имя */}
                <span className="text-[#f4ff54] text-xl font-semibold font-[Montserrat] break-all ">
                  Имя:{" "}
                  {isEditing ? (
                    <input
                      className="bg-[#232323] border-b rounded-lg  px-2 text-[#f4ff54] focus:outline-none"
                      value={editUsername}
                      onChange={e => setEditUsername(e.target.value)}
                    />
                  ) : (
                    <span className="font-normal">{user?.username}</span>
                  )}
                </span>
                {/* Email */}
                <span className="text-[#f4ff54] text-xl font-semibold font-[Montserrat] break-all">
                  Email:{" "}
                  {isEditing ? (
                    <input
                      className="bg-[#232323] rounded-lg px-2 text-[#f4ff54] focus:outline-none"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                    />
                  ) : (
                    <span className="font-normal">{user?.email}</span>
                  )}
                </span>
                <span className="text-[#f4ff54] text-xl font-semibold font-[Montserrat] break-all">
                  Пароль:{" "}
                  {isEditing ? (
                    <input
                      className="bg-[#232323] rounded-lg px-2 text-[#f4ff54] focus:outline-none"
                      value={editPassword}
                      onChange={e => setEditPassword(e.target.value)}
                    />
                  ) : (
                    <></>
                  )}
                </span>
              </div>
              {/* О себе */}
              <div className="mt-2">
                <span className="text-[#f4ff54] text-xl font-semibold font-[Montserrat]">
                  О себе:
                </span>
                <div
                  className="mt-1 text-[#f4ff54] text-lg font-[Montserrat] bg-[#232323] rounded-lg p-3 max-h-[120px] overflow-y-auto whitespace-pre-line break-words"
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "pre-line",
                    lineHeight: 1.5,
                  }}
                >
                  {isEditing ? (
                    <textarea
                      className="w-full bg-[#232323] text-[#f4ff54] border border-[#DBF231] rounded-lg p-2 focus:outline-none resize-none"
                      rows={3}
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                    />
                  ) : (
                    user?.user_description || "Нет информации о себе"
                  )}
                </div>
              </div>

              {/* Кнопка редактирования/сохранения */}
              <div className="flex justify-end mt-4">
                {isEditing ? (
                  <Button title="Сохранить изменения" handleClick={saveChanges} />
                ) : (
                  <Button title="Редактировать профиль" handleClick={startEditing} />
                )}
              </div>
            </div>
            <div className="justify-center items-center my-auto">
              <div className="flex w-[400px] px-10 py-[10px]">
                <Button
                  title="Выйти"
                  handleClick={() => {
                    Logout(setUser, setError);
                    navigate("/");
                  }}
                ></Button>
              </div>
              <div className="flex w-[400px] px-10 py-[10px]">
                <Button
                  title="Удалить аккаунт"
                  handleClick={async () => {
                    await DeleteUser(setUser, user.id);
                    navigate("/");
                  }}
                ></Button>
              </div>
            </div>
            </>)}
          </div>
          </div>
          {favourite?.length != 0 && <div className="px-[8%]">
            <CardScroller data={favourite} text="Избранное"/>
          </div>}
          {watched?.length != 0 && <div className="px-[8%]">
            <CardScroller data={watched} text="Просмотрено"/>
          </div>}
          {future?.length !=0 &&<div className="px-[8%]">
            <CardScroller data={future} text="На будущее"/>
          </div>}
            {reviews?.map((reviewData) => (
              <ReviewPost ReviewPostData={reviewData} setReview={setReview}/>
            ))}
        </div>
    </>
  );
};

export default User;
