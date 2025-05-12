
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { ref, get, query, orderByChild, limitToLast } from "firebase/database";
import { db } from "../firebase/config";
import RatingStars from "../components/ratings/RatingStars";
import useProviderRatings from "../hooks/useProviderRatings";
import { Card, CardContent } from "../components/ui/card";

const Home = () => {
  const [featuredProviders, setFeaturedProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProviders = async () => {
      try {
        const providersRef = ref(db, "providers");
        const providersQuery = query(providersRef, orderByChild("createdAt"), limitToLast(4));
        const snapshot = await get(providersQuery);
        
        if (snapshot.exists()) {
          const providersData = snapshot.val();
          const providersArray = Object.keys(providersData).map(key => ({
            id: key,
            ...providersData[key]
          }));
          
          // Sort randomly for featured section
          setFeaturedProviders(providersArray.sort(() => 0.5 - Math.random()));
        }
      } catch (error) {
        console.error("Error fetching featured providers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProviders();
  }, []);

  const ProviderCard = ({ provider }) => {
    const { averageRating, totalReviews } = useProviderRatings(provider.id);
    
    return (
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="h-48 bg-gray-200 relative">
          {provider.photoURL ? (
            <img
              src={provider.photoURL}
              alt={provider.displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-brand-blue to-brand-darkBlue flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {provider.displayName?.charAt(0) || '?'}
              </span>
            </div>
          )}
          {provider.category && (
            <div className="absolute top-2 right-2 bg-brand-orange text-white text-xs px-2 py-1 rounded">
              {provider.category}
            </div>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg">{provider.displayName}</h3>
          
          <div className="flex items-center mt-1">
            <RatingStars rating={averageRating} size="small" />
            <span className="text-sm text-gray-500 ml-1">
              ({totalReviews})
            </span>
          </div>
          
          {provider.bio && (
            <p className="mt-2 text-gray-600 text-sm line-clamp-2">{provider.bio}</p>
          )}
          
          <Link to={`/providers/${provider.id}`}>
            <Button className="w-full mt-3 bg-brand-blue hover:bg-brand-darkBlue text-white">
              View Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  // Service categories
  const categories = [
    { name: "Plumbing", icon: "🔧" },
    { name: "Electrical", icon: "💡" },
    { name: "Cleaning", icon: "🧹" },
    { name: "Home Repair", icon: "🏠" },
    { name: "Gardening", icon: "🌱" },
    { name: "Moving", icon: "📦" },
    { name: "Tutoring", icon: "📚" },
    { name: "Beauty", icon: "💇" }
  ];

  // How it works steps
  const steps = [
    {
      title: "Find a Provider",
      description: "Browse through our vetted service providers based on your needs",
      icon: "🔍"
    },
    {
      title: "Book a Service",
      description: "Schedule your appointment at a time that works for you",
      icon: "📅"
    },
    {
      title: "Get it Done",
      description: "Enjoy quality service and leave a review when completed",
      icon: "✅"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "I found an amazing electrician within minutes. The service was outstanding!",
      author: "Marcus Johnson",
      role: "Homeowner"
    },
    {
      quote: "As a service provider, this platform has helped me grow my business tremendously.",
      author: "Tasha Williams",
      role: "Professional Cleaner"
    },
    {
      quote: "The quality of providers on this platform is exceptional. Highly recommended!",
      author: "David Chen",
      role: "Small Business Owner"
    }
  ];

  // Sample profile images for black service providers
  const blackServiceProviderImages = [
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=500&auto=format&fit=crop"
  ];

  // Updated featured providers with black service provider images
  const updatedFeaturedProviders = featuredProviders.map((provider, index) => ({
    ...provider,
    photoURL: blackServiceProviderImages[index % blackServiceProviderImages.length]
  }));

  return (
    <Layout>
      {/* Hero Section with Black Provider Image */}
      <section className="relative">
        <div className="bg-gradient-to-r from-brand-darkBlue to-brand-blue py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Supporting Black <br />Entrepreneurship &amp; Excellence
                </h1>
                <p className="mt-4 text-lg text-white/90 max-w-lg">
                  Connect with trusted professionals from your community ready to help with home repairs, maintenance, and more.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link to="/providers">
                    <Button className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white text-lg py-6 px-8">
                      Find a Provider
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline" className="w-full sm:w-auto bg-white hover:bg-gray-100 text-brand-blue text-lg py-6 px-8 border-2 border-white">
                      Join as a Provider
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1536337005238-94b997371b40?q=80&w=1000&auto=format&fit=crop"
                    alt="Professional Black service provider helping a client"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto fill-white"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Get the help you need in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Top Services</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our most popular service categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/providers?category=${category.name}`}
                className="bg-white rounded-lg shadow-sm p-6 text-center transition hover:shadow-md hover:bg-gray-50"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Providers</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our top-rated service professionals from your community
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-100 rounded-lg h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {updatedFeaturedProviders.length > 0 ? (
                updatedFeaturedProviders.map(provider => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))
              ) : (
                <p className="text-center col-span-4 py-8 text-gray-500">
                  No providers available yet.
                </p>
              )}
            </div>
          )}

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
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Don't take our word for it. Here's what our community thinks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl text-brand-blue mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-blue to-brand-darkBlue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mt-4 text-xl max-w-2xl mx-auto">
            Join our community of service seekers and providers today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="w-full sm:w-auto bg-brand-orange hover:bg-orange-600 text-white text-lg py-6 px-8">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-white bg-transparent hover:bg-white/10 text-white text-lg py-6 px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
