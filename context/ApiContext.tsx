
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product, ApiState } from '../types';
import { fetchProducts as fetchProductsApi } from '../utils/api';

interface ApiContextType extends ApiState {
  refreshProducts: () => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ApiState>({
    products: [],
    isLoading: false,
    error: null,
  });

  const refreshProducts = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const products = await fetchProductsApi();
      setState({
        products,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      setState({
        products: [],
        isLoading: false,
        error: err.message || 'Unknown error occurred',
      });
    }
  }, []);

  return (
    <ApiContext.Provider value={{ ...state, refreshProducts }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) throw new Error('useApi must be used within ApiProvider');
  return context;
};
