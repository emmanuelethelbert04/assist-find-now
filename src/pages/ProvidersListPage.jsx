
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase/config';
import { toast } from "sonner";
import { Filter, Search, MapPin } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProviderCard from '../components/services/ProviderCard';
import { Button } from '../components/ui/button';

const ServiceCategories = [
  'All Categories',
  'Plumbing',
  'Electrical',
  'Cleaning',
  'Gardening',
  'Home Repair',
  'Painting',
  'Moving',
  'Tutoring',
  'Pet Care',
  'Beauty & Wellness',
  'IT & Tech Support',
  'Child Care',
  'Cooking & Baking',
  'Event Planning',
  'Photography',
  'Legal Services',
  'Accounting',
];

const ProvidersListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All Categories',
    location: '',
    search: '',
    sortBy: 'rating', // 'rating' or 'price'
  });

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providersRef = ref(db, 'providers');
        const snapshot = await get(providersRef);
        
        if (snapshot.exists()) {
          const providersData = snapshot.val();
          
          // Convert object to array with IDs
          const providersArray = Object.keys(providersData).map(key => ({
            id: key,
            ...providersData[key]
          }));
          
          setProviders(providersArray);
          applyFilters(providersArray);
        } else {
          setProviders([]);
          setFilteredProviders([]);
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
        toast.error("Failed to load service providers");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProviders();
  }, []);
  
  useEffect(() => {
    applyFilters(providers);
  }, [filters, providers]);

  const applyFilters = (allProviders) => {
    let result = [...allProviders];
    
    // Category filter
    if (filters.category && filters.category !== 'All Categories') {
      result = result.filter(provider => provider.category === filters.category);
    }
    
    // Location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      result = result.filter(provider => 
        (provider.city && provider.city.toLowerCase().includes(locationLower)) || 
        (provider.state && provider.state.toLowerCase().includes(locationLower))
      );
    }
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(provider => 
        (provider.displayName && provider.displayName.toLowerCase().includes(searchLower)) || 
        (provider.bio && provider.bio.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort
    if (filters.sortBy === 'rating') {
      result.sort((a, b) => {
        const ratingA = a.reviews 
          ? a.reviews.reduce((acc, review) => acc + review.rating, 0) / a.reviews.length 
          : 0;
        const ratingB = b.reviews 
          ? b.reviews.reduce((acc, review) => acc + review.rating, 0) / b.reviews.length 
          : 0;
        return ratingB - ratingA;
      });
    } else if (filters.sortBy === 'price') {
      result.sort((a, b) => {
        const priceA = a.hourlyRate ? parseFloat(a.hourlyRate) : Infinity;
        const priceB = b.hourlyRate ? parseFloat(b.hourlyRate) : Infinity;
        return priceA - priceB;
      });
    }
    
    setFilteredProviders(result);
    
    // Update URL params for category
    if (filters.category && filters.category !== 'All Categories') {
      setSearchParams({ category: filters.category });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Service Providers</h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Providers
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search by name or keywords"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>
            
            {/* Location */}
            <div className="w-full md:w-48">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="City or state"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                />
              </div>
            </div>
            
            {/* Toggle Filters Button */}
            <div className="w-full md:w-auto">
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full flex items-center justify-center"
              >
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </div>
          
          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Categories */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  {ServiceCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Sort By */}
              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="price">Lowest Price</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        {/* Providers List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading providers...</p>
          </div>
        ) : (
          <>
            {filteredProviders.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-600 mb-4">No service providers found matching your criteria.</p>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
                <Button 
                  onClick={() => setFilters({
                    category: 'All Categories',
                    location: '',
                    search: '',
                    sortBy: 'rating',
                  })}
                  className="bg-brand-blue hover:bg-brand-darkBlue text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-600">{filteredProviders.length} providers found</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProvidersListPage;
