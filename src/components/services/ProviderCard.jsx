
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProviderCard = ({ provider }) => {
  // Calculate average rating
  const avgRating = provider.reviews 
    ? provider.reviews.reduce((acc, review) => acc + review.rating, 0) / provider.reviews.length
    : 0;
  
  const ratingStars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= avgRating) {
      // Full star
      ratingStars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
    } else if (i - 0.5 <= avgRating) {
      // Half star
      ratingStars.push(<Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
    } else {
      // Empty star
      ratingStars.push(<Star key={i} className="w-4 h-4 text-yellow-500" />);
    }
  }
  
  return (
    <Link 
      to={`/providers/${provider.id}`}
      className="block bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md card-hover"
    >
      <div className="relative pb-[50%] bg-gray-200">
        {provider.photoURL ? (
          <img 
            src={provider.photoURL} 
            alt={`${provider.displayName}'s profile picture`}
            className="absolute w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-blue/10">
            <span className="text-brand-blue text-xl font-bold">
              {provider.displayName && provider.displayName.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">
            {provider.displayName}
          </h3>
          {provider.hourlyRate && (
            <span className="text-brand-blue font-semibold">${provider.hourlyRate}/hr</span>
          )}
        </div>
        
        <p className="text-sm text-brand-orange font-medium mt-1">
          {provider.category || 'Service Provider'}
        </p>
        
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            {ratingStars}
          </div>
          <span className="ml-2 text-sm text-gray-500">
            {provider.reviews ? `(${provider.reviews.length})` : '(0)'}
          </span>
        </div>
        
        {provider.bio && (
          <p className="mt-3 text-sm text-gray-600 line-clamp-2">
            {provider.bio}
          </p>
        )}
        
        {provider.city && provider.state && (
          <p className="mt-3 text-xs text-gray-500">
            {provider.city}, {provider.state}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProviderCard;
