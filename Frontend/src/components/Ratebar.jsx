import { useState } from 'react';
import { MdStarRate } from 'react-icons/md';

export default function RatingBar({ defaultValue = 0, setValue, onChange }) {
  const [rating, setRating] = useState(defaultValue);

  const handleClick = (value) => {
    setRating(value);
    onChange?.(value);
  };

  const colorByValue = (value) => {
    if (value <= 4) return 'text-red-500';
    if (value <= 6) return 'text-gray-200';
    return 'text-green-500';
  };

  return (
    <div className="inline-flex items-center gap-2 bg-[#1c1c1e] rounded-full px-3 py-1 select-none">
      <MdStarRate className="text-2xl text-[#C6DE17] -ml-1" />
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => handleClick(num)}
          type="button"
          className={`font-medium w-5 text-center transition-colors ${num === rating ? colorByValue(num) : 'text-gray-400 hover:text-gray-500'}`}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
