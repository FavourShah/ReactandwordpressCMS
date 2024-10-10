import { Outlet } from 'react-router-dom';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, useEffect } from 'react';

const MainLayout = () => {
  // Load cart from localStorage on initial render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []; // Initialize cart from localStorage
  });

  // Add item to cart and update localStorage
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.reduce((acc, item) => {
        if (item.id === product.id) {
          // Increase quantity
          acc.push({ ...item, quantity: item.quantity + 1 });
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      // Check if the product already exists in the cart
      const productExists = prevCart.some(item => item.id === product.id);
      if (!productExists) {
        updatedCart.push({ ...product, quantity: 1 }); // Add new product
      }

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Remove a quantity of the item from the cart and update localStorage
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            // Decrease the quantity if more than 1
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Remove item if quantity is 1
            return null;
          }
        }
        return item;
      }).filter(item => item !== null); // Filter out null values

      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return updatedCart;
    });
  };

  // Remove item completely from the cart
  const handleRemoveItemCompletely = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId); // Filter out the item
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return updatedCart;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar cart={cart} /> {/* Pass cart to Navbar */}
      </header>

      {/* Main content area that grows */}
      <main className="flex-grow">
        <Outlet context={{ handleAddToCart, handleRemoveFromCart, handleRemoveItemCompletely, cart }} /> {/* Provide context */}
      </main>

      {/* Sticky Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
