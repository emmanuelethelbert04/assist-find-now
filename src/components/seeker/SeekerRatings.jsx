
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomerReviewsList from '../ratings/CustomerReviewsList';
import CustomerRatingBadge from './CustomerRatingBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const SeekerRatings = () => {
  const { currentUser } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>My Provider Reviews</CardTitle>
          {currentUser?.uid && (
            <CustomerRatingBadge customerId={currentUser.uid} size="medium" />
          )}
        </div>
        <CardDescription>
          See what service providers have said about working with you
        </CardDescription>
      </CardHeader>
      <CardContent>
        {currentUser?.uid ? (
          <CustomerReviewsList customerId={currentUser.uid} />
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>Please log in to view your reviews.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeekerRatings;
