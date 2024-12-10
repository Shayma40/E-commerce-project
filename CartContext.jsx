import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCart = async () => {
      setError(null);
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        setError('User is not authenticated.');
        console.error("Token missing: User is not authenticated.");
        setIsLoading(false);
        setCartItems([]);
        return;
      }

      try {
        const response = await axios.get('http://localhost:7800/api/cart', { 
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCartItems(response.data.products || []);
      } catch (err) {
        const errMsg = err.response?.data?.message || 'Failed to load cart.';
        setError(errMsg);
        console.error('Error fetching cart:', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const addToCart = async (product, quantity) => {
    setError(null);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('User is not authenticated.');
        console.error("Token missing: User is not authenticated.");
        return;
      }

      const response = await axios.post(
        'http://localhost:7800/api/cart/add',
        { productId: product._id, quantity },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          withCredentials: true,
        }
      );

      setCartItems(response.data.products);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to add item to cart.';
      setError(errMsg);
      console.error('Error adding to cart:', err.message);
    }
  };

  const removeFromCart = async (productId) => {
    setError(null);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError('User is not authenticated.');
        console.error("Token missing: User is not authenticated.");
        return;
      }

      setCartItems(prevItems => prevItems.filter(item => item.productId._id !== productId));

      const response = await axios.delete(`http://localhost:7800/api/cart/remove/${productId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setCartItems(response.data.products);
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to remove item from cart.';
      setError(errMsg);
      console.error('Error removing from cart:', err);
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        error,
        addToCart,
        removeFromCart,
        calculateTotalAmount,
        cart,
        setCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
