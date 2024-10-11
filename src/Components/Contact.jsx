import { useState } from 'react';
import emailjs from 'emailjs-com';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [underlineWidth, setUnderlineWidth] = useState('0');
  const [showNotification, setShowNotification] = useState(false); // Track whether to show the notification

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email) {
      // Show notification immediately
      setShowNotification(true);

      // Send the initial email
      emailjs.send(
        'service_jmijeac',  // My Service ID
        'template_5q5mq5u', // My Template ID for the initial email
        formData,
        'Ui_eX8BQ3XIN8jZoU' // Your User ID
      ).then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        
        // Send the autoresponder email
        emailjs.send(
          'service_jmijeac',  
          'template_k5oala7', // My Template ID for the autoresponder
          formData,
          'Ui_eX8BQ3XIN8jZoU'
        ).then((response) => {
          console.log('Autoresponder sent!', response.status, response.text);
        }).catch((err) => {
          console.error('Failed to send autoresponder...', err);
        });
      }).catch((err) => {
        console.error('Failed to send initial email...', err);
      });

      // Clear the form fields
      setFormData({
        name: '',
        email: '',
      });

      // Hide notification after 2 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  const handleMouseEnter = () => {
    setUnderlineWidth('100%');
  };

  const handleMouseLeave = () => {
    setUnderlineWidth('0');
  };

  return (
    <div className="max-w-lg mx-auto mb-20" id="contact">
      {/* Title and Icon */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-roboto flex flex-col items-center justify-center text-customNav relative">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-3 text-customIcon" />
            <span
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Sign up
              {/* Animated Underline */}
              <span
                className="block h-1 bg-customNav mt-1 transition-all duration-500 ease-out"
                style={{ width: underlineWidth }}
              ></span>
            </span>
          </div>
        </h2>
        {/* Subscription Message */}
        <div className="text-lg text-gray-600 mt-2">
          Subscribe to Our Newsletters
        </div>
      </div>
      
      {/* Form */}
      <div className="relative bg-customNav p-8 rounded-3xl shadow-lg">
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-2xl">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full hover:bg-customNav hover:text-white text-customNav font-bold py-2 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 border border-customIcon text-lg"
          >
            Subscribe
          </button>
        </form>
        
        {/* Success Notification */}
        {showNotification && (
          <div className="absolute top-0 left-0 right-0 mx-auto mt-2 bg-green-100 text-green-800 text-center p-2 rounded-lg shadow-md">
            Subscribed successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
