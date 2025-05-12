
import React from 'react';
import { Button } from '../ui/button';
import ServiceRequestForm from '../services/ServiceRequestForm';

const ServiceRequestSidebar = ({ 
  providerId, 
  providerName, 
  services, 
  showRequestForm, 
  selectedService, 
  handleRequestService, 
  handleRequestSent 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Request a Service</h2>
      
      {showRequestForm && selectedService ? (
        <ServiceRequestForm 
          providerId={providerId} 
          providerName={providerName}
          service={selectedService}
          onRequestSent={handleRequestSent}
        />
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500 mb-4">
            Request a service from {providerName} to get started.
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
  );
};

export default ServiceRequestSidebar;
