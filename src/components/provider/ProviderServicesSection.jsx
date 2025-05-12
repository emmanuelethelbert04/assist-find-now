
import React from 'react';
import { Button } from '../ui/button';

const ProviderServicesSection = ({ services, onRequestService }) => {
  return (
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
                    onClick={() => onRequestService(service)}
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
  );
};

export default ProviderServicesSection;
