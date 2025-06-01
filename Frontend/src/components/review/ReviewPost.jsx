import React, { useState } from "react";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { FaMinus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { DeleteReviewData, EditReviewData, GetUserReviewData } from "../../API/UserAPI";

const ReviewPost = ({ ReviewPostData, setReview }) => {
  const { user } = useContext(UserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(ReviewPostData?.text || "");
  const [editTitle, setEditTitle] = useState(ReviewPostData?.review_name || "");
  const [error, setError] = useState(null);

  const initials = ReviewPostData?.username
    ? ReviewPostData.username.slice(0, 1).toUpperCase()
    : "U";

  let Icon = FaMinus, iconColor = "text-gray-400";
  if (ReviewPostData?.rating === 2) {
    Icon = BiSolidLike; iconColor = "text-green-400";
  } else if (ReviewPostData?.rating === 0) {
    Icon = BiSolidDislike; iconColor = "text-red-400";
  }

  const handleSave = async () => {
    try {
      await EditReviewData({
        review_name: editTitle,
        text: editText,
      }, ReviewPostData.kp_id);
      await GetUserReviewData(user.id, setReview);
      setIsEdit(false);
    }
    catch (e) {
      setError(e.message);
    }
  };

  const handleEditClick = () => {
    setEditText(ReviewPostData?.text || "");
    setEditTitle(ReviewPostData?.review_name || "");
    setIsEdit(true);
  };

  // --- ДОБАВЬ СЮДА ФИЛЬМ --- (замени на твои поля, если названия другие)
  const filmPoster = ReviewPostData?.film_poster; // string, url
  const filmTitle = ReviewPostData?.film_title || "Неизвестный фильм";
  const filmYear = ReviewPostData?.film_year;

  return (
    <div className="min-w-[400px] max-w-[1000px] mb-8 relative pt-5 mx-auto">
      <div className="flex gap-5 bg-[#1A1A1A] rounded-2xl shadow-lg px-6 py-6 relative">
        {user?.id == ReviewPostData?.user_id && (
          <div className="absolute top-7 right-7 flex gap-4 z-10">
            {!isEdit && (
              <button
                className="hover:text-[#f4ff54] text-gray-400 transition"
                title="Редактировать"
                onClick={handleEditClick}
              >
                <FaRegEdit size={20} />
              </button>
            )}
            <button
              onClick={async () => {
                await DeleteReviewData(ReviewPostData?.kp_id);
                await GetUserReviewData(user.id, setReview);
              }}
              className="hover:text-red-400 text-gray-400 transition"
              title="Удалить"
            >
              <FaRegTrashAlt size={20} />
            </button>
          </div>
        )}

        {/* Левая колонка: иконка */}
        <div className="flex flex-col items-center min-w-[48px]">
          <span
            className={`w-12 h-12 flex items-center justify-center rounded-full bg-[#232323] mb-1 text-3xl ${iconColor} shadow`}
          >
            <Icon />
          </span>
        </div>

        {/* Центральная колонка — РЕЦЕНЗИЯ + ФИЛЬМ */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* --- Фильм --- */}
          <div className="flex items-center mb-4 gap-4">
            <img
              src={ReviewPostData?.movie_poster}
              alt={ReviewPostData?.movie_name}
              className="w-16 h-24 object-cover rounded-lg shadow-lg border border-[#232323] bg-[#232323]"
              style={{ minWidth: 64, maxWidth: 64 }}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div>
              <div className="text-[#f4ff54] text-lg font-bold font-[Montserrat]">{ReviewPostData?.movie_name}</div>
              {ReviewPostData?.movie_year && <div className="text-[#a3ae49] text-base">{ReviewPostData?.movie_year}</div>}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#2f2d2d] flex items-center justify-center text-[#C6DE17] font-bold text-lg">
              {initials}
            </div>
            <span className="text-[#C6DE17] font-semibold text-md truncate max-w-[130px]">
              {ReviewPostData?.username}
            </span>
          </div>
          <div className="text-[#f4ff54] font-bold text-lg mb-1 break-words">
            {isEdit ? (
              <input
                className="bg-[#232323] text-[#f4ff54] px-2 py-1 rounded-lg w-full mb-2"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                maxLength={80}
              />
            ) : (
              ReviewPostData?.review_name
            )}
          </div>
          <div className="text-gray-200 text-base break-words whitespace-pre-line pl-1 pr-1 pt-1 pb-2" style={{ wordBreak: "break-word" }}>
            {isEdit ? (
              <textarea
                className="bg-[#232323] text-[#f4ff54] w-full p-2 resize-none rounded-lg"
                rows={4}
                value={editText}
                onChange={e => setEditText(e.target.value)}
                maxLength={500}
              />
            ) : (
              ReviewPostData?.text
            )}
          </div>
          {isEdit && (
            <div className="flex gap-4 mt-2">
              <button
                onClick={handleSave}
                className="bg-[#2c2c2e] p-3 rounded-full hover:bg-[#1c1c1e] transition text-[#a3ae49] font-[Montserrat] hover:text-[#C6DE17] flex"
              >
                Сохранить
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="bg-[#2c2c2e] p-3 rounded-full hover:bg-[#1c1c1e] transition text-[#a3ae49] font-[Montserrat] hover:text-[#C6DE17] flex"
              >
                Отмена
              </button>
            </div>
          )}
          {error && isEdit && (
            <div className="text-red-500 mt-2"> {error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPost;
