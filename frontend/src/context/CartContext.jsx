import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [cartLoading, setCartLoading] = useState(false);

  const fetchCart = async () => {
    if (!user) return;
    try {
      setCartLoading(true);
      const { data } = await API.get('/api/cart');
      setCart(data);
    } catch {
      setCart({ items: [] });
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const addToCart = async (productId) => {
    const { data } = await API.post('/api/cart/add', { productId, quantity: 1 });
    setCart(data);
  };

  const removeFromCart = async (productId) => {
    const { data } = await API.delete(`/api/cart/remove/${productId}`);
    setCart(data);
  };

  const updateQuantity = async (productId, quantity) => {
    const { data } = await API.put(`/api/cart/update/${productId}`, { quantity });
    setCart(data);
  };

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const cartTotal = cart?.items?.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  ) || 0;

  return (
    <CartContext.Provider
      value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, cartLoading, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
