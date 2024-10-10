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
    <div className="container mx-auto p-4 mt-10 mb-20">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-roboto flex flex-col items-start justify-left text-customNav relative">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBoxOpen} className="mr-3 text-customIcon" />
            <span>Our Products</span>
          </div>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-lg font-semibold mb-2">{he.decode(product.title.rendered)}</h2>

            {product._embedded && product._embedded['wp:featuredmedia'] && product._embedded['wp:featuredmedia'][0].source_url && (
              <img
                src={product._embedded['wp:featuredmedia'][0].source_url}
                alt={product.title.rendered}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}

            {/* Display Embedded Price in Stylish Format */}
            <div className="mt-2 text-red-600 text-2xl font-bold">
              Price: #{product.price.toFixed(2)}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleAddToCart({ ...product, price: product.price })}
                className="bg-customButton text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
