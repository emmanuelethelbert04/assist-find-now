
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useProviderRatings from '../../hooks/useProviderRatings';
import ReviewsList from '../ratings/ReviewsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import ProviderRatingBadge from './ProviderRatingBadge';

const ProviderReviews = () => {
  const { currentUser } = useAuth();
  const { ratings, averageRating, totalReviews, loading } = useProviderRatings(currentUser?.uid);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Reviews</h2>
        
        <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
          <div className="mr-3 text-gray-600">Overall Rating:</div>
          <ProviderRatingBadge providerId={currentUser?.uid} size="large" />
        </div>
      </div>
      
      {totalReviews > 0 ? (
        <ReviewsList providerId={currentUser?.uid} />
      ) : (
        <Card>
          <CardContent className="text-center py-10 text-gray-500">
            <p>No reviews yet. Complete more service requests to get reviews from customers.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProviderReviews;
