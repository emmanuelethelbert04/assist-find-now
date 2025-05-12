
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";
import Layout from '../components/layout/Layout';
import ProviderProfile from '../components/provider/ProviderProfile';
import ProviderServicesSection from '../components/provider/ProviderServicesSection';
import ProviderReviewSection from '../components/provider/ProviderReviewSection';
import ServiceRequestSidebar from '../components/provider/ServiceRequestSidebar';

const ProviderDetailPage = () => {
  const { providerId } = useParams();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [pastRequests, setPastRequests] = useState([]);
  
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        // Fetch provider profile
        const providerRef = ref(db, `providers/${providerId}`);
        const providerSnapshot = await get(providerRef);
        
        if (providerSnapshot.exists()) {
          setProvider({
            id: providerId,
            ...providerSnapshot.val()
          });
        } else {
          toast.error("Provider not found");
          navigate('/providers');
          return;
        }
        
        // Fetch provider services
        const servicesRef = ref(db, `services/${providerId}`);
        const servicesSnapshot = await get(servicesRef);
        
        if (servicesSnapshot.exists()) {
          const servicesData = servicesSnapshot.val();
          const servicesArray = Object.keys(servicesData).map(key => ({
            id: key,
            ...servicesData[key]
          }));
          
          setServices(servicesArray);
          if (servicesArray.length > 0) {
            setSelectedService(servicesArray[0]);
          }
        }
        
        // If logged in as a seeker, fetch past completed requests to enable reviews
        if (currentUser && userRole === 'seeker') {
          const requestsRef = ref(db, `requests`);
          const requestsSnapshot = await get(requestsRef);
          
          if (requestsSnapshot.exists()) {
            const requestsData = requestsSnapshot.val();
            const userCompletedRequests = [];
            
            Object.keys(requestsData).forEach(key => {
              const request = requestsData[key];
              if (request.seekerId === currentUser.uid && 
                  request.providerId === providerId && 
                  request.status === 'completed') {
                userCompletedRequests.push({
                  id: key,
                  ...request
                });
              }
            });
            
            setPastRequests(userCompletedRequests);
          }
        }
      } catch (error) {
        console.error("Error fetching provider data:", error);
        toast.error("Failed to load provider information");
      } finally {
        setLoading(false);
      }
    };
    
    if (providerId) {
      fetchProviderData();
    }
  }, [providerId, navigate, currentUser, userRole]);

  const handleRequestService = () => {
    if (!currentUser) {
      toast.error("Please log in to request a service");
      navigate('/login');
      return;
    }
    
    if (userRole === 'provider') {
      toast.error("Providers cannot request services. Please log in as a service seeker.");
      return;
    }
    
    setShowRequestForm(true);
  };

  const handleServiceSelected = (service) => {
    setSelectedService(service);
    handleRequestService();
  };

  const handleRequestSent = () => {
    setShowRequestForm(false);
  };

  const handleToggleReviewForm = () => {
    if (!currentUser) {
      toast.error("Please log in to write a review");
      navigate('/login');
      return;
    }
    
    if (userRole !== 'seeker') {
      toast.error("Only service seekers can write reviews");
      return;
    }
    
    if (pastRequests.length === 0) {
      toast.error("You can only review providers after using their services");
      return;
    }
    
    setShowReviewForm(!showReviewForm);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!provider) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Provider not found</h2>
            <Button 
              onClick={() => navigate('/providers')}
              className="mt-4 bg-brand-blue hover:bg-brand-darkBlue text-white"
            >
              Back to All Providers
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProviderProfile provider={provider} />
        
        {/* Services and Request Form */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ProviderServicesSection 
              services={services} 
              onRequestService={handleServiceSelected} 
            />
            
            <ProviderReviewSection 
              providerId={providerId}
              userRole={userRole}
              pastRequests={pastRequests}
              showReviewForm={showReviewForm}
              handleToggleReviewForm={handleToggleReviewForm}
            />
          </div>
          
          {/* Request Form */}
          <div>
            <ServiceRequestSidebar 
              providerId={providerId}
              providerName={provider.displayName}
              services={services}
              showRequestForm={showRequestForm}
              selectedService={selectedService}
              handleRequestService={handleRequestService}
              handleRequestSent={handleRequestSent}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDetailPage;
