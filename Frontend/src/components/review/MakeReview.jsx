import React, { useState } from 'react'
import { BiSolidLike , BiSolidDislike} from "react-icons/bi";
import { useParams } from 'react-router-dom';
import { SendReviewData } from '../../API/UserAPI';
const MakeReview = () => {
    const { movie_id } = useParams();
    const [reaction,setReaction] = useState(1);
    const [error, setError] = useState(null);
    const [review, setReview] = useState({
        name: '',
        text: '',
        rating: reaction,
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(review);
    }
    const SubmitReview =() => {
        try {
            const reviewData = {
                text: review.text,
                rating: reaction,
            }
            console.log(reviewData);
            SendReviewData(reviewData, movie_id, setError);
            setReview({name: '', text: '', rating: 1 });
            setReaction(1);
        }
        catch (error) {
            console.error('Error sending review:', error);
        }
    }
  return (
    <div className='px-8 pt-3'>
        <div className='flex space-x-4'>
            <input type="text" name="name" className="p-2 border mb-4 w-[60%] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#d1e349] " placeholder='Название рецензии' onChange={handleChange}></input>
            <div className='flex space-x-5 cursor-pointer text-4xl'>
                <BiSolidLike  className={reaction === 1 ? 'text-green-500' : 'text-gray-500'} onClick={() => setReaction(reaction === 2 ? 1 : 2)}></BiSolidLike>
                <BiSolidDislike className={reaction === 0 ? 'text-red-500' : 'text-gray-500'}  onClick={() => setReaction(reaction === 0 ? 1 : 0)}></BiSolidDislike>
            </div>
            <button onClick={SubmitReview} className='bg-[#1c1c1e] py-2 my-2 px-8 rounded-full hover:bg-[#2c2c2e] transition text-[#a3ae49] font-[Montserrat] hover:text-[#C6DE17] flex -translate-y-2'>Отправить</button>
        </div>
        <textarea
            name="text"
            onChange={handleChange}
            value={review.text}
            className="p-2 border mb-4 w-[90%] h-[200px] mx-6 rounded-xl bg-[#333333] border-[#98a116] text-[#d1e349] resize-none"
            placeholder="Твоя рецензия"
        />
    </div>
  )
}
export default MakeReview