
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import Loader from '../components/Loader';

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isInitializing, isLoading } = useAuth();

  // Only show the hard-loading screen during initial token check
  if (isInitializing) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ProductListScreen />} />
            <Route path="/product/:id" element={<ProductDetailsScreen />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
      
      {/* Show the global loader overlay ONLY during non-initializing loading states if needed */}
      {/* (Optional: LoginScreen has its own internal spinner, so we can skip global loader here for better UX) */}
    </div>
  );
};

export default AppNavigator;
