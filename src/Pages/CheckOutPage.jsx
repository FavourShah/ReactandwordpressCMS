import { useOutletContext } from 'react-router-dom';
import he from 'he';

const CheckoutPage = () => {
  const { cart, handleRemoveFromCart, handleRemoveItemCompletely } = useOutletContext(); // Access cart and removal functions from context

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto p-4 mt-10 mb-20">
      <h1 className="text-4xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border-b py-2 flex justify-between items-center">
              <h2 className="text-lg">{he.decode(item.title.rendered)}</h2> {/* Decode title */}
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">Quantity: {item.quantity}</span> {/* Display quantity */}
                <span className="text-gray-600 mr-4">Price: #{item.price.toFixed(2)}</span> {/* Display individual price */}
                <button
                  onClick={() => handleRemoveFromCart(item.id)} // Remove one quantity
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove One
                </button>
                <button
                  onClick={() => handleRemoveItemCompletely(item.id)} // Remove item completely
                  className="bg-gray-500 text-white px-2 py-1 rounded ml-2 hover:bg-gray-600"
                >
                  Remove All
                </button>
              </div>
            </div>
          ))}
          {/* Display Total Price */}
          <div className="mt-4 font-bold text-2xl text-red-600">
            Total Price: #{totalPrice.toFixed(2)} {/* Display the total price */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
