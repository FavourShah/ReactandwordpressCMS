import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-customNav text-white py-12 mt-auto">
      <div className="flex justify-center space-x-10 mb-4">
        <Link to="https://facebook.com/profile.php?id=100075709832960" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="text-2xl hover:text-customIcon transition duration-300" />
        </Link>
        <Link to="https://x.com/Emewoya?t=9COyIJOaCjbi_XoJdr2lw&s=09" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-2xl hover:text-customIcon transition duration-300" />
        </Link>
        <Link to="https://instagram.com/emewoya?igsh=MW9wcTdpazYwMVqcA" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-2xl hover:text-customIcon transition duration-300" />
        </Link>
      </div>
      <p className="text-center text-sm text-gray-400">
        LiFt 2024 &copy; All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
