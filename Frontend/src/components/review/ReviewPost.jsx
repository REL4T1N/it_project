import React from 'react'
import { BiSolidLike } from "react-icons/bi";
import { FaMinus } from "react-icons/fa";
import { BiSolidDislike } from "react-icons/bi";

const ReviewPost = ({ReviewPostData}) => {
  return (
    <div className="w-[90%] px-12 ">
      <div className="flex space-x-2 float-right translate-y-4 -translate-x-14 text-4xl"> 
            {ReviewPostData?.rate === 2 ? (
              <BiSolidLike className="text-green-500" />
            ) : ReviewPostData?.rate === 1 ? (
              <FaMinus className="text-gray-400" />
            ) : (<BiSolidDislike className="text-red-500" />
            )}
              <p className="text-sm text-gray-400">{ReviewPostData?.name}</p>
        </div>
      <div className={`flex flex-col bg-[#1A1A1A] rounded-2xl p-4 mt-4`}>
        <div className="flex items-center space-x-4">
          {/* <img src={'f.'} alt="User" className="w-12 h-12 rounded-full" /> */}
          <div>
            <p className="text-m px-2 text-gray-400">Unknown user</p>
          </div>
        </div>
        <p className="mt-2 text-gray-300 break-words max-w-full max-h-40 overflow-auto py-3 pr-8 pl-1">
          {ReviewPostData?.text}
        </p>
      </div>
    </div>
  )
}
export default ReviewPost