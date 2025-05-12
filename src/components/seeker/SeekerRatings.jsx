
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useCustomerRatings from '../../hooks/useCustomerRatings';
import CustomerReviewsList from '../ratings/CustomerReviewsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const SeekerRatings = () => {
  const { currentUser } = useAuth();
  const { ratings, averageRating, totalReviews, loading } = useCustomerRatings(currentUser?.uid);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Provider Reviews</CardTitle>
        <CardDescription>
          See what service providers have said about working with you
        </CardDescription>
      </CardHeader>
      <CardContent>
        {totalReviews > 0 ? (
          <CustomerReviewsList customerId={currentUser?.uid} />
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No reviews yet. Complete more service requests to get reviews from providers.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeekerRatings;
