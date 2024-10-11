import { useOutletContext } from 'react-router-dom';
import he from 'he';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const CheckoutPage = () => {
  const { cart, handleRemoveFromCart, handleRemoveItemCompletely } = useOutletContext(); // Access cart and removal functions from context

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto p-4 mt-10 mb-20">
      {/* Checkout Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-roboto flex flex-col items-center justify-center text-customNav relative">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-3 text-customIcon" />
            <span>Checkout</span>
          </div>
        </h1>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border-b py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">{he.decode(item.title.rendered)}</h2> {/* Decode title */}
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">Quantity: {item.quantity}</span> {/* Display quantity */}

                {/* Calculate total price for each item */}
                <span className="text-gray-600 mr-4">
                  Total Price: #{(item.price * item.quantity).toFixed(2)}
                </span> {/* Display total price per item */}

                <button
                  onClick={() => handleRemoveFromCart(item.id)} // Remove one quantity
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  Remove One
                </button>
                <button
                  onClick={() => handleRemoveItemCompletely(item.id)} // Remove item completely
                  className="bg-gray-500 text-white px-3 py-1 rounded-lg ml-2 hover:bg-gray-600 transition-all duration-200"
                >
                  Remove All
                </button>
              </div>
            </div>
          ))}
          {/* Display Total Price */}
          <div className="mt-6 font-bold text-2xl text-red-600 text-center">
            Total Price: #{totalPrice.toFixed(2)} {/* Display the total price */}
          </div>
        </div>
      )}

      {/* Payment Details Section */}
      <div className="mt-10">
        <div className="bg-gray-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FontAwesomeIcon icon={faCreditCard} className="mr-3 text-customIcon" />
            Payment Details
          </h2>
          <p className="text-gray-600">
            Please transfer the total amount to the following bank account details:
            <br />
            <strong>Account Name:</strong> LiFt Fitness <br />
            <strong>Bank Name:</strong> Palmpay <br />
            <strong>Account Number:</strong> 1234567890 <br />
        
            <br />
Once the payment is complete, please forward your receipt to us via
            email: ezechioriakufavour@gmail.com or whatsapp: 09072838324
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
