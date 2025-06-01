import React from 'react'
import Skeleton from '../components/Skeleton'
const LoadingPage = () => {
  return (
    <>
    <p className="text-center text-2xl font-bold mt-20">
        <span className="text-[#C6DE17]">Загрузка...</span>
        <span className="text-[#a3ae49] pl-4">Пожалуйста, подождите</span>
    </p>
    <Skeleton></Skeleton>
    </>
  )
}

export default LoadingPage