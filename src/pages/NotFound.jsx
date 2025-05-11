
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-9xl font-bold text-brand-blue">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6 text-gray-800">Page Not Found</h2>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex space-x-4">
          <Link to="/">
            <Button className="bg-brand-blue hover:bg-brand-darkBlue text-white px-6">
              Back to Home
            </Button>
          </Link>
          <Link to="/providers">
            <Button variant="outline" className="px-6">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
