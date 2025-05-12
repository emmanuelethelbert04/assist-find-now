
import React from 'react';
import { Button } from '../ui/button';
import ReviewsList from '../ratings/ReviewsList';
import ReviewForm from '../ratings/ReviewForm';

const ProviderReviewSection = ({ 
  providerId, 
  userRole, 
  pastRequests, 
  showReviewForm, 
  handleToggleReviewForm 
}) => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        {userRole === 'seeker' && pastRequests.length > 0 && (
          <Button
            onClick={handleToggleReviewForm}
            className="bg-brand-orange hover:bg-orange-600 text-white"
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </Button>
        )}
      </div>
      
      {showReviewForm && (
        <div className="mb-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-medium mb-3">Write Your Review</h3>
          <ReviewForm 
            providerId={providerId} 
            serviceRequestId={pastRequests[0]?.id} 
          />
        </div>
      )}
      
      <ReviewsList providerId={providerId} />
    </div>
  );
};

export default ProviderReviewSection;
