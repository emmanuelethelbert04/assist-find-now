
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
      {/* Hero Section - Enhanced with stronger gradient, typography and animations */}
      <section className="bg-gradient-to-r from-brand-darkBlue to-brand-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in tracking-tight">
                Find Trusted Service Providers Near You
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in" style={{animationDelay: "0.2s"}}>
                Connect with local professionals for all your service needs.
                From plumbers to cleaners, our platform has skilled experts ready to help.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: "0.3s"}}>
                <Link to="/providers">
                  <Button className="bg-white text-brand-blue hover:bg-gray-100 text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
                    Find Services
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-brand-orange hover:bg-orange-600 text-white text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Join as Provider
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Service provider and client shaking hands" 
                className="rounded-lg shadow-2xl hover:shadow-xl transition-all duration-300 border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced with better visual hierarchy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">How It Works</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Finding the right service provider has never been easier
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Search</h3>
              <p className="text-gray-600">
                Search for service providers based on your needs, location, and budget
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 border border-gray-100 transform md:translate-y-4">
              <div className="w-20 h-20 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Select</h3>
              <p className="text-gray-600">
                Choose from our verified providers with detailed profiles and reviews
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Link2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Connect</h3>
              <p className="text-gray-600">
                Request services and communicate directly with your chosen provider
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories - Enhanced with better card design */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Popular Service Categories</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect service provider for any job you need
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {serviceCategories.map((category) => (
              <Link 
                to={`/providers?category=${category.name}`}
                key={category.name}
                className="bg-white rounded-xl p-6 shadow-md text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/providers">
              <Button className="bg-brand-blue hover:bg-brand-darkBlue text-white font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300">
                Browse All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Providers - Enhanced with better card design */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Featured Service Providers</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Highly rated professionals ready to help with your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative">
                  <img src={provider.image} alt={provider.name} className="object-cover w-full h-56" />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center shadow-md">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-semibold text-gray-900">{provider.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{provider.name}</h3>
                  <div className="inline-block bg-blue-100 text-brand-blue text-sm font-medium px-3 py-1 rounded-full mb-4">
                    {provider.service}
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-2">{provider.caption}</p>
                  <Link to={`/providers/${provider.id}`}>
                    <Button className="w-full bg-brand-blue hover:bg-brand-darkBlue text-white font-medium py-2.5">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/providers">
              <Button className="bg-brand-blue hover:bg-brand-darkBlue text-white font-semibold px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300">
                View All Providers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced with better card design */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What Our Users Say</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mb-6"></div>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from people who found great service providers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 relative hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
                  <span className="text-brand-orange text-xl font-bold">"</span>
                </div>
                <div className="flex mb-4 mt-3 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic text-center">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900 text-center">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join as Provider CTA - Enhanced with stronger gradient and better typography */}
      <section className="py-16 bg-gradient-to-r from-brand-darkBlue to-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Are You a Service Provider?</h2>
              <p className="text-xl text-gray-100">
                Join our platform to grow your business and connect with new clients.
                Register now to create your profile and start receiving service requests.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link to="/signup">
                <Button className="bg-brand-orange hover:bg-orange-600 text-white text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
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
