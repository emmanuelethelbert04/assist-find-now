
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { toast } from "sonner";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, getUserRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      const userCredential = await login(email, password);
      const role = await getUserRole(userCredential.user.uid);
      toast("Logged in successfully!");
      
      // Redirect based on user role
      if (role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/seeker-dashboard');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      toast.error("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <a 
            href="/forgot-password" 
            className="text-sm text-brand-blue hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate('/forgot-password');
            }}
          >
            Forgot Password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white"
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </Button>
      </form>
      
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <a 
          href="/signup" 
          className="text-brand-blue hover:underline"
          onClick={(e) => {
            e.preventDefault();
            navigate('/signup');
          }}
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
