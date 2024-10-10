import { useState } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight, faComments } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: 'John Doe',
    review: 'This fitness blog has completely changed my lifestyle. The tips are amazing!',
  },
  {
    name: 'Jane Smith',
    review: 'I love the workout routines. They are easy to follow and very effective.',
  },
  {
    name: 'Michael Johnson',
    review: 'The nutrition advice has helped me lose weight and feel great. Highly recommended!',
  },
];

const Testimonials = () => {
  const [underlineWidth, setUnderlineWidth] = useState('0');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const handleMouseEnter = () => {
    setUnderlineWidth('100%');
  };

  const handleMouseLeave = () => {
    setUnderlineWidth('0');
  };

  return (
    <div className="container mx-auto p-4 mt-10 mb-20 " id = "testiomonials">
      {/* Title and Icon outside the card */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-roboto flex flex-col items-center justify-center text-customNav relative">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faComments} className="mr-3 text-customIcon" />
            <span
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Testimonials
              {/* Animated Underline */}
              <span
                className="block h-1 bg-customNav mt-1 transition-all duration-500 ease-out"
                style={{ width: underlineWidth }}
              ></span>
            </span>
          </div>
        </h2>
      </div>

      <div className="bg-none rounded-lg shadow-lg border-2 border-customIcon p-6">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center">
              <FontAwesomeIcon icon={faQuoteLeft} className="text-customIcon text-4xl mb-4" />
              <p className="text-lg text-gray-700 mb-4">{testimonial.review}</p>
              <FontAwesomeIcon icon={faQuoteRight} className="text-customIcon text-4xl mb-4" />
              <p className="text-xl font-semibold text-customNav">{testimonial.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
