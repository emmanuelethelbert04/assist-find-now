
import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

const useCustomerRatings = (customerId) => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (!customerId) {
      setLoading(false);
      return;
    }

    try {
      const ratingsRef = ref(db, `feedback/${customerId}`);
      
      const unsubscribe = onValue(ratingsRef, (snapshot) => {
        if (snapshot.exists()) {
          const ratingsData = snapshot.val();
          const ratingsArray = Object.keys(ratingsData).map(key => ({
            id: key,
            ...ratingsData[key]
          }));
          
          // Sort ratings by date (newest first)
          ratingsArray.sort((a, b) => b.timestamp - a.timestamp);
          
          // Calculate average rating
          const total = ratingsArray.reduce((sum, rating) => sum + rating.rating, 0);
          const avg = ratingsArray.length > 0 ? total / ratingsArray.length : 0;
          
          setRatings(ratingsArray);
          setAverageRating(avg);
          setTotalReviews(ratingsArray.length);
          setLoading(false);
        } else {
          setRatings([]);
          setAverageRating(0);
          setTotalReviews(0);
          setLoading(false);
        }
      }, (error) => {
        console.error("Error fetching customer ratings:", error);
        setError("Failed to load ratings");
        setLoading(false);
      });
      
      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up ratings listener:", err);
      setError("Failed to set up ratings listener");
      setLoading(false);
    }
  }, [customerId]);

  return { ratings, averageRating, totalReviews, loading, error };
};

export default useCustomerRatings;
