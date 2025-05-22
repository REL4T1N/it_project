import ReviewPost from './ReviewPost'
import { IoMdAdd, IoMdClose } from "react-icons/io";
import MakeReview from './MakeReview';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Footer from '../footer/Footer';
const Review = ({ reviews = []}) => {
const {user, setUser} = useContext(UserContext)
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();
  return (
    <>
    <div className='flex pt-8 px-16 space-x-6'>
        <h1 className='text-[#cfde5d] text-2xl  font-[Montserrat]'>Рецензии</h1>
        <button className='bg-[#1c1c1e] py-2 px-3 rounded-full hover:bg-[#2c2c2e] transition text-[#a3ae49] font-[Montserrat] hover:text-[#C6DE17] flex -translate-y-1' 
        onClick={() => {
            if (user) {
                setIsOpen((prev)=>!prev);
            } else {
                navigate('/login');
            }
        }}>
            {isOpen ?
            <><IoMdClose className='text-2xl'/>Скрыть</>
            :
            <><IoMdAdd className='text-2xl'/>Написать рецензию</>
        }
        </button>
    </div>
    {isOpen && <MakeReview/>}
    {reviews.length === 0 ? (
    <p className='text-[#cfde5d] font-[Montserrat] py-10 px-16'>На этот фильм еще не оставляли рецензии. Будьте первым!</p>)
    :
    reviews.map((review) => (
        <ReviewPost key={review.review_id} ReviewPostData={review}/>
    ))}
    <div className='pb-20'></div>
    <Footer/>
    </>
  )
}

export default Review