
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ref, push, serverTimestamp, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../firebase/config';
import { toast } from "sonner";
import RatingStars from './RatingStars';
import { Button } from '../ui/button';

const ReviewForm = ({ providerId, serviceRequestId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("You must be logged in to submit a review.");
      return;
    }
    
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Check if user has already reviewed this provider for this service request
      const reviewsRef = ref(db, `ratings/${providerId}`);
      const userReviewsQuery = query(
        reviewsRef,
        orderByChild('userId'),
        equalTo(currentUser.uid)
      );
      
      const snapshot = await get(userReviewsQuery);
      let hasReviewed = false;
      
      if (snapshot.exists()) {
        // Check all reviews by this user for this provider
        snapshot.forEach((childSnapshot) => {
          const review = childSnapshot.val();
          if (review.serviceRequestId === serviceRequestId) {
            hasReviewed = true;
          }
        });
      }
      
      if (hasReviewed) {
        toast.error("You've already reviewed this service.");
        setSubmitting(false);
        return;
      }
      
      // Add the review
      const reviewData = {
        rating,
        comment,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        serviceRequestId,
        timestamp: Date.now()
      };
      
      await push(ref(db, `ratings/${providerId}`), reviewData);
      
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment('');
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Rating
        </label>
        <RatingStars
          rating={rating}
          interactive={true}
          onChange={setRating}
          size="large"
        />
      </div>
      
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Your Review
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
          placeholder="Share your experience with this provider..."
        />
      </div>
      
      <Button
        type="submit"
        className="bg-brand-blue hover:bg-brand-darkBlue text-white"
        disabled={submitting || rating === 0}
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;
