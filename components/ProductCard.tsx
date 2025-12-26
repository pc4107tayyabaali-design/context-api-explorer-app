
import React from 'react';
import { Product } from '../types';
import { Star, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product.id)}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-6">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-yellow-400 fill-current" />
          {product.rating.rate}
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          {product.category}
        </div>
        <h3 className="font-bold text-gray-800 dark:text-gray-100 line-clamp-2 min-h-[3rem] text-sm leading-snug">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-black text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <button className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
