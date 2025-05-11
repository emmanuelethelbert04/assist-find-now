
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ref, get, set, push } from 'firebase/database';
import { db } from '../../firebase/config';
import { toast } from "sonner";
import { Home, Search, MessageSquare, Star } from 'lucide-react';
import RequestHistory from './RequestHistory';

const SeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileRef = ref(db, `users/${currentUser.uid}`);
        const snapshot = await get(profileRef);
        
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col space-y-1">
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 text-left rounded-md flex items-center hover:bg-gray-100"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </button>
            <button 
              onClick={() => navigate('/providers')}
              className="px-4 py-2 text-left rounded-md flex items-center hover:bg-gray-100"
            >
              <Search className="mr-2 h-4 w-4" />
              Find Providers
            </button>
            <button 
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 text-left rounded-md flex items-center ${activeTab === 'requests' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100'}`}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              My Requests
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-left rounded-md flex items-center ${activeTab === 'reviews' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100'}`}
            >
              <Star className="mr-2 h-4 w-4" />
              My Reviews
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'requests' && (
            <RequestHistory seekerId={currentUser.uid} />
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
              <p className="text-gray-500">You haven't left any reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeekerDashboard;
