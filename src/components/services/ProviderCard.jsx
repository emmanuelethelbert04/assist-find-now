
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';
import RatingStars from '../ratings/RatingStars';

const ProviderCard = ({ provider }) => {
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  
  useEffect(() => {
    if (!provider.id) return;
    
    const reviewsRef = ref(db, `ratings/${provider.id}`);
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      if (snapshot.exists()) {
        const reviewsData = Object.values(snapshot.val());
        const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviewsData.length;
        
        setRating(avgRating);
        setReviewCount(reviewsData.length);
      } else {
        setRating(0);
        setReviewCount(0);
      }
    });
    
    return () => unsubscribe();
  }, [provider.id]);
  
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
        
        <div className="mt-2">
          <RatingStars rating={rating} size="small" />
          <span className="ml-2 text-sm text-gray-500">
            ({reviewCount})
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
