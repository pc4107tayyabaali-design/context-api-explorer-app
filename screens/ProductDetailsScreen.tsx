
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../context/ApiContext';
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const ProductDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useApi();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return products.find(p => p.id === Number(id));
  }, [products, id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-semibold group"
      >
        <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-50">
          <ArrowLeft size={20} />
        </div>
        Back to Results
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Image Container */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center aspect-square">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transform hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Right: Info Container */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-black uppercase tracking-widest rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1.5 rounded-full">
                <Star size={18} className="text-yellow-500 fill-current" />
                <span className="font-bold text-yellow-700 dark:text-yellow-500">{product.rating.rate}</span>
              </div>
              <span className="text-gray-400 font-medium">({product.rating.count} customer reviews)</span>
            </div>
          </div>

          <div className="text-4xl font-black text-blue-600">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <Truck size={24} className="text-blue-600" />
              <div>
                <p className="font-bold text-sm text-gray-800 dark:text-gray-100">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <RefreshCw size={24} className="text-blue-600" />
              <div>
                <p className="font-bold text-sm text-gray-800 dark:text-gray-100">30-Day Return</p>
                <p className="text-xs text-gray-500">No questions asked</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 sm:col-span-2">
              <ShieldCheck size={24} className="text-blue-600" />
              <div>
                <p className="font-bold text-sm text-gray-800 dark:text-gray-100">Official Warranty</p>
                <p className="text-xs text-gray-500">Full manufacturer support included</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-95">
              <ShoppingCart size={24} />
              Add to Cart
            </button>
            <button className="flex-1 py-5 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsScreen;
