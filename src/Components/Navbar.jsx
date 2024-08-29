import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false); // Close the menu after clicking
  };

  const handleScrollLinkClick = (path) => {
    if (location.pathname === "/") {
      // If already on the homepage, just scroll
      ScrollLink.scrollTo(path, { smooth: true, duration: 500, offset: -70 });
    } else {
      // Navigate to the homepage and then scroll
      navigate(`/#${path}`);
    }
    closeNav(); // Close the menu
  };

  const navItems = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Posts', path: '/posts' },
    { id: 3, text: 'Reviews', path: '/testimonials' },
    { id: 4, text: 'Sign Up', path: '/contact' },
  ];

  return (
    <div className='bg-customNav flex justify-between items-center h-20 mx-auto px-10 text-white relative'>
      <h1 className='w-full text-3xl font-montserrat text-customHead'>LiFt.</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex font-montserrat space-x-10'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-customButton rounded-xl m-1 cursor-pointer duration-300 text-customTyp text-l whitespace-nowrap'
          >
            {item.path === '/testimonials' || item.path === '/contact' ? (
              <span onClick={() => handleScrollLinkClick(item.path)}>{item.text}</span>
            ) : (
              <Link to={item.path} onClick={closeNav}>
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden cursor-pointer z-50'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Overlay (Visible only when menu is open) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${nav ? 'block' : 'hidden'}`}
        onClick={handleNav} // to close the menu when the overlay is clicked
      ></div>

      {/* Mobile Navigation Menu */}
      <ul
        className={`fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#2C3E50] ease-in-out duration-500 z-50 ${nav ? 'flex' : 'hidden'} flex-col justify-center items-center`}
      >
        <h1 className='w-full text-3xl font-bold text-white m-4 text-center'>LiFt.</h1>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 w-full text-center border-b border-gray-300 hover:bg-customButton duration-300 hover:text-black cursor-pointer'
          >
            {item.path === 'testimonials' || item.path === 'contact' ? (
              <span onClick={() => handleScrollLinkClick(item.path)}>{item.text}</span>
            ) : (
              <Link to={item.path} onClick={closeNav}>
                {item.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
