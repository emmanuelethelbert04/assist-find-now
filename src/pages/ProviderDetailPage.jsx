import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import { toast } from "sonner";
import { MapPin, Phone, Mail, Star, Clock, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import ServiceRequestForm from '../components/services/ServiceRequestForm';
import ReviewsList from '../components/ratings/ReviewsList';
import ReviewForm from '../components/ratings/ReviewForm';

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

  const formatRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Provider Header */}
          <div className="flex flex-col md:flex-row">
            {/* Provider Photo */}
            <div className="md:w-1/3 p-6">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto">
                {provider.photoURL ? (
                  <img 
                    src={provider.photoURL} 
                    alt={`${provider.displayName}'s profile`} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-400">
                      {provider.displayName?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Provider Info */}
            <div className="md:w-2/3 p-6 md:border-l">
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{provider.displayName}</h1>
                  <p className="text-lg text-brand-orange mt-1">{provider.category}</p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-5 h-5 ${
                            star <= formatRating(provider.reviews)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {formatRating(provider.reviews)} 
                      {provider.reviews ? `(${provider.reviews.length} reviews)` : '(0 reviews)'}
                    </span>
                  </div>
                </div>
                
                {provider.hourlyRate && (
                  <div className="mt-2 md:mt-0 bg-gray-100 px-4 py-2 rounded-lg flex items-center">
                    <DollarSign className="h-5 w-5 text-brand-blue mr-1" />
                    <span className="text-xl font-semibold">${provider.hourlyRate}/hr</span>
                  </div>
                )}
              </div>
              
              {/* Experience and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {provider.yearsOfExperience && (
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{provider.yearsOfExperience} years of experience</span>
                  </div>
                )}
                
                {(provider.city || provider.state) && (
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                    <span>{[provider.city, provider.state].filter(Boolean).join(', ')}</span>
                  </div>
                )}
              </div>
              
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {provider.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <a href={`tel:${provider.phone}`} className="text-brand-blue hover:underline">
                      {provider.phone}
                    </a>
                  </div>
                )}
                
                {provider.email && (
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <a href={`mailto:${provider.email}`} className="text-brand-blue hover:underline">
                      {provider.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Provider Bio */}
          {provider.bio && (
            <div className="px-6 py-4 border-t">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-gray-700">{provider.bio}</p>
            </div>
          )}
        </div>
        
        {/* Services and Request Form */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
              
              {services.length === 0 ? (
                <p className="text-gray-500">This provider hasn't listed any services yet.</p>
              ) : (
                <>
                  <div className="space-y-4 divide-y divide-gray-200">
                    {services.map((service) => (
                      <div 
                        key={service.id} 
                        className={`pt-4 ${service.id !== services[0].id ? 'pt-4' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{service.title}</h3>
                            <p className="text-gray-600 mt-1">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-brand-blue font-semibold">${service.price}</div>
                            {service.duration && <div className="text-gray-500 text-sm">{service.duration} min</div>}
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <Button
                            onClick={() => {
                              setSelectedService(service);
                              handleRequestService();
                            }}
                            className="bg-brand-blue hover:bg-brand-darkBlue text-white text-sm"
                          >
                            Request This Service
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Reviews */}
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
          </div>
          
          {/* Request Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Request a Service</h2>
              
              {showRequestForm && selectedService ? (
                <ServiceRequestForm 
                  providerId={providerId} 
                  providerName={provider.displayName}
                  service={selectedService}
                  onRequestSent={handleRequestSent}
                />
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">
                    Request a service from {provider.displayName} to get started.
                  </p>
                  {services.length === 0 ? (
                    <p className="text-yellow-600">
                      This provider hasn't listed any services yet.
                    </p>
                  ) : (
                    <Button 
                      onClick={handleRequestService}
                      className="bg-brand-blue hover:bg-brand-darkBlue text-white"
                    >
                      Start Service Request
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDetailPage;
