
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About ServiceConnect</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting quality service providers with clients in need of their expertise.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              At ServiceConnect, we believe that finding reliable service providers shouldn't be a challenge. 
              Our platform bridges the gap between skilled professionals and those who need their services.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're looking for a plumber to fix a leaky faucet or an electrician to install new lighting,
              our mission is to make the process seamless, transparent, and trustworthy.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="People working together"
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Service provider at work"
              className="w-full h-auto"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Help</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-blue text-white flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">
                  <strong>For Service Providers:</strong> We offer a platform to showcase skills, set rates, and connect with new clients.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-blue text-white flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">
                  <strong>For Service Seekers:</strong> We provide easy access to vetted professionals with transparent pricing and reviews.
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-brand-blue text-white flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">
                  <strong>For Communities:</strong> We strengthen local economies by facilitating connections between local providers and clients.
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="hero-gradient rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a skilled professional looking for new opportunities or a client in need of services,
            ServiceConnect is here to help you connect and thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-brand-blue hover:bg-gray-100 px-8 py-3 text-lg">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/providers">
              <Button className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-3 text-lg">
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
