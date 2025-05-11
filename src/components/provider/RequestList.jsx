
import React, { useState, useEffect } from 'react';
import { ref, get, update } from 'firebase/database';
import { db } from '../../firebase/config';
import { Button } from '../ui/button';
import { toast } from "sonner";
import { Check, X, MessageSquare } from 'lucide-react';

const RequestList = ({ providerId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsRef = ref(db, `requests`);
        const snapshot = await get(requestsRef);
        
        if (snapshot.exists()) {
          const requestsData = snapshot.val();
          const filteredRequests = [];
          
          // Filter requests for this provider
          Object.keys(requestsData).forEach(key => {
            if (requestsData[key].providerId === providerId) {
              filteredRequests.push({
                id: key,
                ...requestsData[key]
              });
            }
          });
          
          // Sort by date (newest first)
          filteredRequests.sort((a, b) => b.createdAt - a.createdAt);
          setRequests(filteredRequests);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Failed to load service requests");
      } finally {
        setLoading(false);
      }
    };
    
    if (providerId) {
      fetchRequests();
    }
  }, [providerId]);

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      const requestRef = ref(db, `requests/${requestId}`);
      await update(requestRef, { 
        status: newStatus,
        updatedAt: Date.now()
      });
      
      // Update local state
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: newStatus, updatedAt: Date.now() } 
            : request
        )
      );
      
      toast(`Request ${newStatus === 'accepted' ? 'accepted' : 'declined'} successfully`);
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error("Failed to update request status");
    }
  };

  const handleSendReply = async () => {
    if (!selectedRequest || !replyMessage.trim()) return;
    
    try {
      const messageData = {
        text: replyMessage,
        senderId: providerId,
        timestamp: Date.now()
      };
      
      // Add message to the request
      const requestRef = ref(db, `requests/${selectedRequest.id}`);
      await update(requestRef, {
        messages: selectedRequest.messages 
          ? [...selectedRequest.messages, messageData] 
          : [messageData],
        updatedAt: Date.now()
      });
      
      // Update local state
      setRequests(prev => 
        prev.map(request => 
          request.id === selectedRequest.id 
            ? { 
                ...request, 
                messages: request.messages ? [...request.messages, messageData] : [messageData],
                updatedAt: Date.now() 
              } 
            : request
        )
      );
      
      setSelectedRequest(prev => ({
        ...prev,
        messages: prev.messages ? [...prev.messages, messageData] : [messageData],
        updatedAt: Date.now()
      }));
      
      setReplyMessage('');
      toast("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <div className="animate-pulse text-center p-4">Loading requests...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Service Requests</h2>
      
      {selectedRequest ? (
        <div>
          <button
            onClick={() => setSelectedRequest(null)}
            className="mb-4 text-brand-blue hover:underline inline-flex items-center"
          >
            ← Back to all requests
          </button>
          
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{selectedRequest.serviceTitle}</h3>
                  <p className="text-sm text-gray-500">From: {selectedRequest.seekerName}</p>
                  <p className="text-sm text-gray-500">Requested: {formatDate(selectedRequest.createdAt)}</p>
                </div>
                <div className={`px-2 py-1 rounded text-sm ${
                  selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  selectedRequest.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-gray-700">{selectedRequest.message}</p>
              </div>
              
              {selectedRequest.status === 'pending' && (
                <div className="mt-4 flex space-x-3">
                  <Button 
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'accepted')}
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Accept
                  </Button>
                  <Button 
                    onClick={() => handleUpdateStatus(selectedRequest.id, 'declined')}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Decline
                  </Button>
                </div>
              )}
            </div>
            
            {/* Messages section */}
            <div className="p-4 bg-gray-50">
              <h4 className="font-medium mb-3">Messages</h4>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {selectedRequest.messages && selectedRequest.messages.length > 0 ? (
                  selectedRequest.messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg max-w-[80%] ${
                        msg.senderId === providerId 
                          ? 'bg-brand-blue text-white ml-auto' 
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {formatDate(msg.timestamp)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No messages yet</p>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
                <Button
                  onClick={handleSendReply}
                  className="bg-brand-blue hover:bg-brand-darkBlue text-white rounded-l-none"
                  disabled={!replyMessage.trim()}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {requests.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">You don't have any service requests yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {requests.map((request) => (
                <div key={request.id} className="py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{request.serviceTitle}</h3>
                      <p className="text-sm text-gray-500">From: {request.seekerName}</p>
                      <p className="text-sm text-gray-500">{formatDate(request.createdAt)}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-sm ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-gray-700 truncate max-w-md">{request.message}</p>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => setSelectedRequest(request)}
                        variant="outline"
                        className="text-sm"
                      >
                        <MessageSquare className="mr-1 h-4 w-4" />
                        View Details
                      </Button>
                      
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            onClick={() => handleUpdateStatus(request.id, 'accepted')}
                            className="text-sm bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Accept
                          </Button>
                          <Button 
                            onClick={() => handleUpdateStatus(request.id, 'declined')}
                            className="text-sm bg-red-600 hover:bg-red-700 text-white"
                          >
                            <X className="mr-1 h-4 w-4" />
                            Decline
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RequestList;
