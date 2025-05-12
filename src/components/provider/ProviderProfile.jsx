
import React from 'react';
import { Star, Clock, MapPin, Phone, Mail, DollarSign } from 'lucide-react';

const ProviderProfile = ({ provider }) => {
  const formatRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  return (
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
  );
};

export default ProviderProfile;
