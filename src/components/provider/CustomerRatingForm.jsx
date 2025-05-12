
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ref, push, serverTimestamp, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../firebase/config';
import { toast } from "sonner";
import RatingStars from '../ratings/RatingStars';
import { Button } from '../ui/button';

const CustomerRatingForm = ({ customerId, customerName, serviceRequestId, onRatingSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("You must be logged in to submit a rating.");
      return;
    }
    
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Check if provider has already rated this customer for this service request
      const ratingsRef = ref(db, `feedback/${customerId}`);
      const providerRatingsQuery = query(
        ratingsRef,
        orderByChild('providerId'),
        equalTo(currentUser.uid)
      );
      
      const snapshot = await get(providerRatingsQuery);
      let hasRated = false;
      
      if (snapshot.exists()) {
        // Check all ratings by this provider for this customer
        snapshot.forEach((childSnapshot) => {
          const review = childSnapshot.val();
          if (review.serviceRequestId === serviceRequestId) {
            hasRated = true;
          }
        });
      }
      
      if (hasRated) {
        toast.error("You've already rated this customer for this service.");
        setSubmitting(false);
        return;
      }
      
      // Add the rating
      const ratingData = {
        rating,
        comment,
        providerId: currentUser.uid,
        providerName: currentUser.displayName || 'Service Provider',
        serviceRequestId,
        timestamp: Date.now()
      };
      
      await push(ref(db, `feedback/${customerId}`), ratingData);
      
      toast.success("Rating submitted successfully!");
      setRating(0);
      setComment('');
      
      if (onRatingSubmitted) {
        onRatingSubmitted();
      }
    } catch (error) {
      console.error("Error submitting customer rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rate {customerName || 'Customer'}
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
          Comments (Optional)
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
          placeholder="Share your experience with this customer..."
        />
      </div>
      
      <Button
        type="submit"
        className="bg-brand-blue hover:bg-brand-darkBlue text-white"
        disabled={submitting || rating === 0}
      >
        {submitting ? 'Submitting...' : 'Submit Rating'}
      </Button>
    </form>
  );
};

export default CustomerRatingForm;
