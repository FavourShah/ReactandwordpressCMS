import { FaWhatsapp } from 'react-icons/fa'; 

const WhatsAppIcon = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center justify-center">
      {/* Need Help Text */}
      <div className="mb-2 text-sm text-gray-700 font-semibold bg-white p-1 rounded-lg shadow-md">
        Chat Us
      </div>

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/2349072838324" 
        target="_blank"  // Open in a new tab
        rel="noopener noreferrer"
        className="bg-green-500 p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
        style={{ width: '60px', height: '60px' }} // Ensures the circle is perfect
      >
        <FaWhatsapp size={30} className="text-white" /> {/* Icon inside the circle */}
      </a>
    </div>
  );
};

export default WhatsAppIcon;
