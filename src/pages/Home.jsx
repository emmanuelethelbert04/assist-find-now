
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Search, Users, CheckCircle, Award } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Home = () => {
  const serviceCategories = [
    { name: 'Plumbing', icon: '🔧' },
    { name: 'Electrical', icon: '⚡' },
    { name: 'Cleaning', icon: '✨' },
    { name: 'Gardening', icon: '🌿' },
    { name: 'Home Repair', icon: '🏠' },
    { name: 'Painting', icon: '🎨' },
    { name: 'Moving', icon: '📦' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Trusted Service Providers Near You
              </h1>
              <p className="text-xl mb-8">
                Connect with local professionals for all your service needs.
                From plumbers to cleaners, our platform has skilled experts ready to help.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/providers">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg px-8 py-6">
                    Find Services
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-brand-orange hover:bg-orange-600 text-white text-lg px-8 py-6">
                    Join as Provider
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Service provider and client shaking hands" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Service Categories</h2>
            <p className="mt-4 text-xl text-gray-600">
              Find the perfect service provider for any job you need
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {serviceCategories.map((category) => (
              <Link 
                to={`/providers?category=${category.name}`}
                key={category.name}
                className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-medium">{category.name}</h3>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/providers">
              <Button className="bg-brand-blue hover:bg-brand-darkBlue text-white">
                Browse All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Finding the right service provider has never been easier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Find</h3>
              <p className="text-gray-600">
                Search for service providers based on your needs, location, and budget
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Connect</h3>
              <p className="text-gray-600">
                Request services and communicate directly with your chosen provider
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Review</h3>
              <p className="text-gray-600">
                After service completion, share your experience to help others
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join as Provider CTA */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Are You a Service Provider?</h2>
              <p className="text-xl">
                Join our platform to grow your business and connect with new clients.
                Register now to create your profile and start receiving service requests.
              </p>
            </div>
            <div>
              <Link to="/signup">
                <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg px-8 py-6">
                  Join as Provider
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
