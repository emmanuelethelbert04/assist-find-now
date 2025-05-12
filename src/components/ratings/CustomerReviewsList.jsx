
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase/config';
import RatingStars from './RatingStars';
import { Star } from 'lucide-react';

const CustomerReviewsList = ({ customerId, limit }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  
  useEffect(() => {
    if (!customerId) return;
    
    const reviewsRef = ref(db, `feedback/${customerId}`);
    
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      if (snapshot.exists()) {
        const reviewsData = snapshot.val();
        const reviewsArray = Object.keys(reviewsData).map(key => ({
          id: key,
          ...reviewsData[key]
        }));
        
        // Sort by newest first
        reviewsArray.sort((a, b) => b.timestamp - a.timestamp);
        
        // Calculate average rating
        const totalRating = reviewsArray.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviewsArray.length;
        
        setAverageRating(avgRating);
        setReviews(limit ? reviewsArray.slice(0, limit) : reviewsArray);
      } else {
        setReviews([]);
        setAverageRating(0);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [customerId, limit]);
  
  if (loading) {
    return <div className="animate-pulse h-20 bg-gray-100 rounded-md"></div>;
  }
  
  if (reviews.length === 0) {
    return <p className="text-gray-500 italic">No reviews yet.</p>;
  }
  
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 mr-2" />
          <span className="text-xl font-semibold">{averageRating.toFixed(1)}</span>
        </div>
        <span className="text-gray-500 ml-2">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
      </div>
      
      <div className="space-y-4 divide-y divide-gray-200">
        {reviews.map((review) => (
          <div key={review.id} className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <RatingStars rating={review.rating} size="small" />
                <span className="ml-2 font-medium">{review.providerName}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.timestamp).toLocaleDateString()}
              </span>
            </div>
            {review.comment && (
              <p className="mt-2 text-gray-700">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviewsList;
