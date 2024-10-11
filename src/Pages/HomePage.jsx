import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from "../Components/Hero";
import PostListings from "../Components/PostListings";
import HomeBody from "../Components/HomeBody";
import Contact from "../Components/Contact";
import Testimonials from "../Components/Testimonials";
import Products from "../Components/Products";
import Spinner from '../components/Spinner'; // Import your Spinner component
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const categoryId = 4;
  const productsCategoryId = 6;
  const { handleAddToCart } = useOutletContext(); // Get handleAddToCart from context

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (you can replace with actual fetching logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Example loading duration of 2 seconds
  }, []);

  if (isLoading) return <Spinner />; // Show the spinner while loading

  return (
    <>
      <Hero />
      <PostListings />
      <HomeBody categoryId={categoryId} />

      <Contact />

      <Testimonials />
      <Products productsCategoryId={productsCategoryId} addToCart={handleAddToCart} />

      {/* View All Products Button */}
      <div className="text-center mb-"> 
        <Link
          to="/products"
          className="inline-flex items-center text-customNav border border-customIcon px-4 py-2 rounded-full text-lg hover:bg-customNav hover:text-white transition mb-20"
        >
          View All Products
        </Link>
      </div>
    </>
  );
};

export default HomePage;
