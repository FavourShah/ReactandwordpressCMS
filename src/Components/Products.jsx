import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'; 
import { useOutletContext } from 'react-router-dom';
import he from 'he';
import { motion } from 'framer-motion';

const Products = ({ productsCategoryId }) => {
  const [products, setProducts] = useState([]);
  const { handleAddToCart } = useOutletContext();

  useEffect(() => {
    fetch(`https://favourezechi.com.ng/wp/wp-json/wp/v2/posts?_embed&categories=${productsCategoryId}`)
      .then(response => response.json())
      .then(data => {
        const productsWithPrices = data.map(product => {
          const priceMatch = product.content.rendered.match(/Price:\s*\#(\d+(\.\d{1,2})?)/); // Adjust the regex based on your format
          const price = priceMatch ? parseFloat(priceMatch[1]) : 0; // Extract and convert to float
          return { ...product, price }; // Add the price to the product object
        });
        setProducts(productsWithPrices);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [productsCategoryId]);

  return (
    <div className="container mx-auto p-4 mt-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-roboto flex flex-col items-center justify-center text-customNav relative">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBoxOpen} className="mr-3 text-customIcon" />
            <span>Our Products</span>
          </div>
        </h1>
      </div>

      {/* Product Grid: 1 column on small, 2 columns on medium, and 4 columns on large screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 relative"
            whileHover={{ scale: 1.05 }}
          >
            {/* Product Title */}
            <h2 className="text-lg font-semibold mb-2 text-center">{he.decode(product.title.rendered)}</h2>

            {/* Featured Image: Image will pop out on hover */}
            {product._embedded && product._embedded['wp:featuredmedia'] && product._embedded['wp:featuredmedia'][0].source_url && (
              <div className="relative group">
                {/* Regular Image */}
                <img
                  src={product._embedded['wp:featuredmedia'][0].source_url}
                  alt={product.title.rendered}
                  className="w-full h-32 object-cover rounded-md mb-4 transition-transform transform group-hover:scale-110"
                />
                {/* Image Overlay: Popout Effect on Hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <img
                    src={product._embedded['wp:featuredmedia'][0].source_url}
                    alt={product.title.rendered}
                    className="w-2/3 h-2/3 object-cover rounded-md"
                  />
                </div>
              </div>
            )}

            {/* Price Display */}
            <div className="mt-2 text-red-600 text-lg font-semibold text-center">
              Price: #{product.price.toFixed(2)}
            </div>

            {/* Add to Cart Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => handleAddToCart({ ...product, price: product.price })}
                className="bg-customNav text-white px-4 py-2 rounded-lg border-2 border-customNav hover:bg-transparent hover:text-customNav transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
