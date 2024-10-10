import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'; // Add shopping cart icon
import { Link, useNavigate, useLocation } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';

const Navbar = ({ cart }) => { // Receive cart as a prop
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false); // Close the menu after clicking
  };

  const handleScrollLinkClick = (id) => {
    const offset = -350; // Adjust this value as needed
    if (location.pathname === "/") {
      // If already on the homepage, scroll to the section
      scroll.scrollTo(id, { smooth: true, duration: 500, offset });
    } else {
      // Navigate to the homepage and scroll to the section
      navigate("/");
      setTimeout(() => {
        scroll.scrollTo(id, { smooth: true, duration: 500, offset });
      }, 0);
    }
    closeNav(); // Close the menu
  };

  const navItems = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Posts', path: '/posts' },
    { id: 3, text: 'Reviews', scrollToId: 'testimonials' }, // Scroll to Testimonials
    { id: 4, text: 'Sign Up', scrollToId: 'contact' }, // Scroll to Contact
    { id: 5, text: 'Shop', path: '/products' },
  ];

  // Calculate total item quantity in the cart
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='bg-customNav flex justify-between items-center h-20 mx-auto px-10 text-white relative'>
      <h1 className='w-full text-3xl font-montserrat text-customHead'>LiFt.</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex font-montserrat space-x-10 items-center'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 hover:bg-customButton rounded-xl m-1 cursor-pointer duration-300 text-customTyp text-l whitespace-nowrap'
          >
            {item.scrollToId ? (
              <span onClick={() => handleScrollLinkClick(item.scrollToId)}>{item.text}</span>
            ) : (
              <Link to={item.path} onClick={closeNav}>
                {item.text}
              </Link>
            )}
          </li>
        ))}

        {/* Cart Display */}
        <li className='relative flex items-center'>
          <Link to="/cart" className='flex items-center'>
            <AiOutlineShoppingCart size={24} className='cursor-pointer' />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white px-2 py-1 text-xs">
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </li>
      </ul>

      {/* Mobile Cart Icon */}
      <div className="block md:hidden flex items-center z-50">
        {/* Cart Display for Mobile */}
        <Link to="/cart" className='relative flex items-center mr-4'>
          <AiOutlineShoppingCart size={24} className='cursor-pointer' />
          {totalItemsInCart > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white px-2 py-1 text-xs">
              {totalItemsInCart}
            </span>
          )}
        </Link>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className='cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
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
            {item.scrollToId ? (
              <span onClick={() => handleScrollLinkClick(item.scrollToId)}>{item.text}</span>
            ) : (
              <Link to={item.path} onClick={closeNav}>
                {item.text}
              </Link>
            )}
          </li>
        ))}

        {/* Mobile Cart Display */}
        <li className='relative flex items-center'>
          <Link to="/cart" className='flex items-center'>
            <AiOutlineShoppingCart size={24} className='cursor-pointer' />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white px-2 py-1 text-xs">
                {totalItemsInCart}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
