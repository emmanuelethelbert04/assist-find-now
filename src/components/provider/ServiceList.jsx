
import React, { useState, useEffect } from 'react';
import { ref, push, set, get, remove } from 'firebase/database';
import { db } from '../../firebase/config';
import { Button } from '../ui/button';
import { toast } from "sonner";
import { Plus, Edit, Trash } from 'lucide-react';

const ServiceList = ({ providerId }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesRef = ref(db, `services/${providerId}`);
        const snapshot = await get(servicesRef);
        
        if (snapshot.exists()) {
          const servicesData = snapshot.val();
          const servicesArray = Object.keys(servicesData).map(key => ({
            id: key,
            ...servicesData[key]
          }));
          setServices(servicesArray);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    
    if (providerId) {
      fetchServices();
    }
  }, [providerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    
    try {
      const newServiceRef = push(ref(db, `services/${providerId}`));
      const serviceData = {
        ...formData,
        createdAt: Date.now()
      };
      
      await set(newServiceRef, serviceData);
      
      // Add to local state
      setServices(prev => [...prev, { id: newServiceRef.key, ...serviceData }]);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
      });
      
      setShowAddForm(false);
      toast("Service added successfully");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
    }
  };

  const handleEditService = async (e) => {
    e.preventDefault();
    
    try {
      const serviceRef = ref(db, `services/${providerId}/${editingService.id}`);
      const serviceData = {
        ...formData,
        updatedAt: Date.now()
      };
      
      await set(serviceRef, serviceData);
      
      // Update local state
      setServices(prev => 
        prev.map(service => 
          service.id === editingService.id 
            ? { ...service, ...serviceData } 
            : service
        )
      );
      
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
      });
      
      toast("Service updated successfully");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const serviceRef = ref(db, `services/${providerId}/${serviceId}`);
        await remove(serviceRef);
        
        // Update local state
        setServices(prev => prev.filter(service => service.id !== serviceId));
        toast("Service deleted successfully");
      } catch (error) {
        console.error("Error deleting service:", error);
        toast.error("Failed to delete service");
      }
    }
  };

  const startEditService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
    });
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="animate-pulse text-center p-4">Loading services...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Services</h2>
        {!showAddForm && !editingService && (
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-brand-blue hover:bg-brand-darkBlue text-white flex items-center"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Service
          </Button>
        )}
      </div>

      {/* Add/Edit Service Form */}
      {(showAddForm || editingService) && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-4">
            {editingService ? 'Edit Service' : 'Add New Service'}
          </h3>
          <form onSubmit={editingService ? handleEditService : handleAddService} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Service Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingService(null);
                  setFormData({
                    title: '',
                    description: '',
                    price: '',
                    duration: '',
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-brand-blue hover:bg-brand-darkBlue text-white">
                {editingService ? 'Update Service' : 'Add Service'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      {services.length === 0 && !showAddForm ? (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven't added any services yet.</p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="mt-3 bg-brand-blue hover:bg-brand-darkBlue text-white"
          >
            Add Your First Service
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {services.map((service) => (
            <div key={service.id} className="py-4 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{service.title}</h3>
                <p className="text-gray-600 mt-1">{service.description}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-brand-blue font-semibold">${service.price}</span>
                  {service.duration && (
                    <span className="ml-3 text-gray-500">{service.duration} minutes</span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditService(service)}
                  className="p-1 text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
