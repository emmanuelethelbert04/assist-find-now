
import React from 'react';
import { Star } from 'lucide-react';
import useProviderRatings from '../../hooks/useProviderRatings';

const ProviderRatingBadge = ({ providerId, size = 'medium' }) => {
  const { averageRating, totalReviews, loading } = useProviderRatings(providerId);
  
  const sizeClasses = {
    small: {
      container: "px-1.5 py-0.5 text-xs",
      star: "w-3 h-3 mr-0.5",
      text: "text-xs"
    },
    medium: {
      container: "px-2 py-1 text-sm",
      star: "w-4 h-4 mr-1",
      text: "text-sm"
    },
    large: {
      container: "px-2.5 py-1.5 text-base",
      star: "w-5 h-5 mr-1",
      text: "text-base"
    }
  };
  
  const classes = sizeClasses[size] || sizeClasses.medium;
  
  if (loading) {
    return <div className={`animate-pulse bg-gray-200 rounded-md ${classes.container}`}></div>;
  }
  
  if (totalReviews === 0) {
    return <div className={`text-gray-500 ${classes.text}`}>No reviews yet</div>;
  }
  
  return (
    <div className={`flex items-center bg-yellow-50 text-yellow-800 rounded-md ${classes.container}`}>
      <Star className={`fill-yellow-500 text-yellow-500 ${classes.star}`} />
      <span className={`font-medium ${classes.text}`}>
        {averageRating.toFixed(1)} ({totalReviews})
      </span>
    </div>
  );
};

export default ProviderRatingBadge;
