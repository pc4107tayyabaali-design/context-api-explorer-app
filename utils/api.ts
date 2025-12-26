
import { Product } from '../types';

const REQRES_URL = 'https://reqres.in/api';
const FAKESTORE_URL = 'https://fakestoreapi.com';

/**
 * Mock Data for fallback when APIs are blocked
 */
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 299.99,
    description: "Experience world-class noise cancellation and superior sound quality with these high-end wireless headphones. Perfect for audiophiles and travelers alike.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: { rate: 4.8, count: 120 }
  },
  {
    id: 2,
    title: "Minimalist Leather Watch",
    price: 150.00,
    description: "A timeless piece of craftsmanship featuring a genuine Italian leather strap and a scratch-resistant sapphire crystal face.",
    category: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    rating: { rate: 4.5, count: 85 }
  },
  {
    id: 3,
    title: "Smart Fitness Tracker",
    price: 89.99,
    description: "Track your steps, heart rate, and sleep patterns with this sleek and waterproof fitness band. Syncs perfectly with all major smartphones.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1526170315870-efcec8395c4b?w=800&q=80",
    rating: { rate: 4.2, count: 210 }
  },
  {
    id: 4,
    title: "Organic Cotton Hoodie",
    price: 65.00,
    description: "Ultra-soft hoodie made from 100% organic cotton. Sustainably sourced and ethically manufactured for maximum comfort.",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    rating: { rate: 4.7, count: 56 }
  }
];

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

export const loginUser = async (email: string, password: string): Promise<{ token: string }> => {
  try {
    const response = await fetch(`${REQRES_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Login failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error: any) {
    console.warn("Login API blocked or failed, using mock fallback:", error.message);
    
    // Automatic fallback for demonstration purposes if network is blocked
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ token: "QpwL5tke4Pnpja7X4" }); // Standard ReqRes mock token
        }, 1000);
      });
    }
    throw error;
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${FAKESTORE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return await response.json();
  } catch (error: any) {
    console.warn("Products API blocked or failed, using mock fallback:", error.message);
    
    // Return mock products if external API is unreachable
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRODUCTS);
      }, 800);
    });
  }
};
