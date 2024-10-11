import { FaWhatsapp } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const WhatsAppIcon = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center justify-center">
      {/* Need Help Text */}
      <div className="mb-2 text-sm text-gray-700 font-semibold bg-white p-1 rounded-lg shadow-md">
    Chat Us
      </div>

      {/* WhatsApp Icon */}
      <Link
        to={{ pathname: "https://wa.me/09072838324" }} // WhatsApp link
        target="_blank"  // Open in a new tab
        rel="noopener noreferrer"
        className="bg-green-500 p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
        style={{ width: '60px', height: '60px' }} // Ensures the circle is perfect
      >
        <FaWhatsapp size={30} className="text-white" /> {/* Icon inside the circle */}
      </Link>
    </div>
  );
};

export default WhatsAppIcon;
