import { useOutletContext } from 'react-router-dom';
import he from 'he';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3'; // Flutterwave imports

const CheckoutPage = () => {
  const { cart, handleRemoveFromCart, handleRemoveItemCompletely } = useOutletContext(); // Access cart and removal functions from context

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Generate a description that includes the exact items being paid for
  const itemNames = cart.map((item) => he.decode(item.title.rendered)).join(', ');

  // Flutterwave payment configuration
  const flutterwaveConfig = {
    public_key: 'FLWPUBK_TEST-cfc89c95ece5516a4bc0d365bd0d9026-X',
    tx_ref: `${Date.now()}_payment_for_${itemNames.replace(/,\s*/g, '_')}`, // Concatenating item names into tx_ref
    amount: totalPrice,
    currency: 'NGN',
    payment_options: 'card, mobilemoney, ussd',
    customer: {
      email: 'ezechioriakufavour@gmail.com',
      phonenumber: '09072838324',
      name: 'Favour Chiemewoya',
    },
    customizations: {
      title: 'LiFt Fitness Payment',
      description: `Payment for LiFt Fitness`, 
    },
    meta: {
      cartItems: itemNames, // Add cart item names to metadata
      totalPrice: totalPrice.toFixed(2),
    },
    callback: (response) => {
      console.log(response);
      // Perform actions after successful payment (e.g., send payment notification)
      closePaymentModal(); // Close the payment modal when done
    },
    onClose: () => {
      console.log('Payment closed');
    },
  };

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
            <div key={item.id} className="border-b py-4">
              {/* Item details and buttons in a responsive layout */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-lg font-semibold">{he.decode(item.title.rendered)}</h2> {/* Decode title */}
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Quantity and total price */}
                  <span className="text-gray-600">Quantity: {item.quantity}</span> {/* Display quantity */}
                  <span className="text-gray-600">Total Price: #{(item.price * item.quantity).toFixed(2)}</span> {/* Display total price */}

                  {/* Buttons: Remove one and remove all */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)} // Remove one quantity
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-200"
                    >
                      Remove One
                    </button>
                    <button
                      onClick={() => handleRemoveItemCompletely(item.id)} // Remove item completely
                      className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-all duration-200"
                    >
                      Remove All
                    </button>
                  </div>
                </div>
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
            email: ezechioriakufavour@gmail.com or WhatsApp: 09072838324
          </p>
        </div>
      </div>

      {/* Flutterwave Payment Section */}
      <div className="mt-10">
        <div className="bg-gray-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FontAwesomeIcon icon={faCreditCard} className="mr-3 text-customIcon" />
            Pay with Flutterwave
          </h2>
          <p className="text-gray-600 mb-4">
            You can also pay securely using Flutterwave. Click the button below to proceed with
            payment.
          </p>
          <FlutterWaveButton
            {...flutterwaveConfig}
            className="bg-customNav text-white px-4 py-2 rounded-lg border-2 border-customNav hover:bg-transparent hover:text-customNav transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Pay with Flutterwave
          </FlutterWaveButton>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
