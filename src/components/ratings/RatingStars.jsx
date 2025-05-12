
import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, size = 'medium', interactive = false, onChange }) => {
  const maxRating = 5;
  const starSizes = {
    small: 'w-3 h-3',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };
  
  const sizeClass = starSizes[size] || starSizes.medium;

  const handleStarClick = (index) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`${sizeClass} ${
            index < Math.floor(rating)
              ? 'text-yellow-500 fill-yellow-500'
              : index < rating && rating % 1 !== 0
              ? 'text-yellow-500 fill-yellow-500 opacity-50'
              : 'text-yellow-500'
          } ${interactive ? 'cursor-pointer' : ''}`}
          onClick={() => handleStarClick(index)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleStarClick(index);
            }
          }}
          tabIndex={interactive ? 0 : -1}
        />
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600 font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default RatingStars;
