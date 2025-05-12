
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ref, get, set, update } from 'firebase/database';
import { db } from '../../firebase/config';
import { toast } from "sonner";
import ServiceList from './ServiceList';
import ProfileForm from './ProfileForm';
import RequestList from './RequestList';
import ProviderReviews from './ProviderReviews';

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
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
        const profileRef = ref(db, `providers/${currentUser.uid}`);
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

  const handleProfileUpdate = async (profileData) => {
    if (!currentUser) return;
    
    try {
      const updates = {};
      updates[`providers/${currentUser.uid}`] = {
        ...profileData,
        updatedAt: Date.now()
      };
      
      await update(ref(db), updates);
      setProfile(profileData);
      toast("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Provider Dashboard</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-left rounded-md ${activeTab === 'profile' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100'}`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 text-left rounded-md ${activeTab === 'services' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100'}`}
            >
              My Services
            </button>
            <button 
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 text-left rounded-md ${activeTab === 'requests' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100'}`}
            >
              Service Requests
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 text-left rounded-md ${activeTab === 'reviews' ? 'bg-brand-blue text-white' : 'hover:bg-gray-100'}`}
            >
              Reviews
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'profile' && (
            <ProfileForm profile={profile} onSave={handleProfileUpdate} />
          )}
          
          {activeTab === 'services' && (
            <ServiceList providerId={currentUser.uid} />
          )}
          
          {activeTab === 'requests' && (
            <RequestList providerId={currentUser.uid} />
          )}
          
          {activeTab === 'reviews' && (
            <ProviderReviews />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
