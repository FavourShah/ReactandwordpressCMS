import Products from "../Components/Products";
import { useOutletContext } from 'react-router-dom';

const ProductsPage = () => {
  const { handleAddToCart } = useOutletContext(); // Get handleAddToCart from context
  const productsCategoryId = 6;

  return (
    <>
      <Products productsCategoryId={productsCategoryId} addToCart={handleAddToCart} /> {/* Pass it to Products */}
    </>
  );
};

export default ProductsPage;
