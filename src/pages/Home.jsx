import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Search, CheckCircle, Link2, Star, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardContent } from '../components/ui/card';

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

  const featuredProviders = [
    {
      id: 1,
      name: 'John Smith',
      service: 'Plumbing',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      caption: 'Professional plumber with 10+ years of experience in residential repairs'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      service: 'Electrical',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      caption: 'Licensed electrician specializing in home wiring and installations'
    },
    {
      id: 3,
      name: 'David Chen',
      service: 'Cleaning',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      caption: 'Thorough home cleaning services with eco-friendly products'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Michelle R.',
      text: 'Found an amazing plumber within minutes. The service was excellent and reasonably priced!',
      rating: 5
    },
    {
      id: 2,
      name: 'Robert T.',
      text: "I've been using ServiceConnect for all my home repairs. The quality of providers is consistently high.",
      rating: 4
    },
    {
      id: 3,
      name: 'Jessica K.',
      text: 'As someone new to the area, this platform helped me find trustworthy local service providers quickly.',
      rating: 5
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Find Trusted Service Providers Near You
              </h1>
              <p className="text-xl mb-8">
                Connect with local professionals for all your service needs.
                From plumbers to cleaners, our platform has skilled experts ready to help.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/providers">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg px-8 py-6 flex items-center">
                    Find Services
                    <ArrowRight className="ml-2" />
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
                className="rounded-lg shadow-lg hover:shadow-xl transition-all"
              />
            </div>
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
            <div className="bg-white p-8 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Search</h3>
              <p className="text-gray-600">
                Search for service providers based on your needs, location, and budget
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Select</h3>
              <p className="text-gray-600">
                Choose from our verified providers with detailed profiles and reviews
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Link2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Connect</h3>
              <p className="text-gray-600">
                Request services and communicate directly with your chosen provider
              </p>
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
                className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-all hover:-translate-y-1 card-hover"
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

      {/* Featured Providers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Service Providers</h2>
            <p className="mt-4 text-xl text-gray-600">
              Highly rated professionals ready to help with your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden card-hover">
                <div className="aspect-w-3 aspect-h-2">
                  <img src={provider.image} alt={provider.name} className="object-cover w-full h-48" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{provider.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1">{provider.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-brand-blue font-medium mb-3">{provider.service}</div>
                  <p className="text-gray-600 mb-4">{provider.caption}</p>
                  <Link to={`/providers/${provider.id}`}>
                    <Button className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/providers">
              <Button className="bg-brand-blue hover:bg-brand-darkBlue text-white">
                View All Providers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600">
              Real experiences from people who found great service providers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 relative hover:shadow-md transition-all">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <p className="font-medium text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join as Provider CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-darkBlue text-white">
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
