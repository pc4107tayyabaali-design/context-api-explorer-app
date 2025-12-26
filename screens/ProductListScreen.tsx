
import React, { useEffect, useState, useMemo } from 'react';
import { useApi } from '../context/ApiContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  LogOut, 
  Moon, 
  Sun, 
  RefreshCcw, 
  ChevronDown,
  ShoppingBag,
  Filter
} from 'lucide-react';

const PAGE_SIZE = 8;

const ProductListScreen: React.FC = () => {
  const { products, isLoading, error, refreshProducts } = useApi();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      refreshProducts();
    }
  }, [products.length, refreshProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, currentPage * PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshProducts();
    setIsRefreshing(false);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <ShoppingBag className="text-blue-600" size={32} />
            ContextStore
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Hello, {user?.email.split('@')[0]}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            onClick={handleRefresh}
            className={`p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCcw size={20} />
          </button>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-5 py-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search products, brands, categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors shadow-sm dark:text-white">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Product Grid */}
      {error && (
        <div className="p-8 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400">
          <h2 className="text-xl font-bold mb-2">Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleRefresh} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg font-bold">Retry</button>
        </div>
      )}

      {!error && (
        <>
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={(id) => navigate(`/product/${id}`)}
                />
              ))}
            </div>
          ) : !isLoading && (
            <div className="py-20 text-center">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">No products found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}

          {/* Load More */}
          {displayedProducts.length < filteredProducts.length && (
            <div className="mt-12 text-center">
              <button 
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl font-black text-gray-800 dark:text-white hover:border-blue-500 hover:text-blue-500 transition-all shadow-md active:scale-95"
              >
                Load More Products
                <ChevronDown size={20} />
              </button>
            </div>
          )}
        </>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default ProductListScreen;
