
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ref, push, set } from 'firebase/database';
import { db } from '../../firebase/config';
import { Button } from '../ui/button';
import { toast } from "sonner";

const ServiceRequestForm = ({ providerId, providerName, service, onRequestSent }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error("Please log in to request a service");
      return;
    }
    
    setLoading(true);
    
    try {
      const requestRef = push(ref(db, 'requests'));
      
      await set(requestRef, {
        seekerId: currentUser.uid,
        seekerName: currentUser.displayName,
        providerId,
        providerName,
        serviceId: service.id,
        serviceTitle: service.title,
        message,
        status: 'pending',
        createdAt: Date.now(),
      });
      
      setMessage('');
      toast.success("Service request sent successfully!");
      
      if (onRequestSent) {
        onRequestSent();
      }
    } catch (error) {
      console.error("Error sending service request:", error);
      toast.error("Failed to send service request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message to the Service Provider
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
          placeholder="Describe what you need, preferred dates/times, questions, etc."
          required
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white"
        disabled={loading}
      >
        {loading ? 'Sending Request...' : 'Send Service Request'}
      </Button>
    </form>
  );
};

export default ServiceRequestForm;
