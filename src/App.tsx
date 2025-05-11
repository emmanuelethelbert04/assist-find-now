
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProviderDashboardPage from "./pages/ProviderDashboardPage";
import SeekerDashboardPage from "./pages/SeekerDashboardPage";
import ProvidersListPage from "./pages/ProvidersListPage";
import ProviderDetailPage from "./pages/ProviderDetailPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

// Protected Route Component
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/provider-dashboard" 
              element={
                <ProtectedRoute requiredRole="provider">
                  <ProviderDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/seeker-dashboard" 
              element={
                <ProtectedRoute requiredRole="seeker">
                  <SeekerDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/providers" element={<ProvidersListPage />} />
            <Route path="/providers/:providerId" element={<ProviderDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
