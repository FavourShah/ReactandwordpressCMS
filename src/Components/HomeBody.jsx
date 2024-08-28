import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import he from 'he';
import { motion } from 'framer-motion';

const HomeBody = ({ categoryId }) => {
  const [posts, setPosts] = useState([]);
  const [underlineWidth, setUnderlineWidth] = useState('0');

  useEffect(() => {
    // Fetch the 3 most recent posts ordered by date in descending order
    fetch(`https://favourezechi.com.ng/wp/wp-json/wp/v2/posts?_embed&per_page=3&orderby=date&order=desc&categories=${categoryId}`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [categoryId]);

  const handleMouseEnter = () => {
    setUnderlineWidth('100%');
  };

  const handleMouseLeave = () => {
    setUnderlineWidth('0'); // Reset the underline width to animate again on the next hover
  };

  return (
    <div className="container mx-auto p-4 mt-10 mb-20">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-roboto flex flex-col items-start justify-left text-customNav relative">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-3 text-customIcon" />
            <span
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Latest
              {/* Animated Underline */}
              <span
                className="block h-1 bg-customNav mt-1 transition-all duration-500 ease-out"
                style={{ width: underlineWidth }}
              ></span>
            </span>
          </div>
        </h1>
      </div>

      <div className="flex flex-col space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="relative bg-white rounded-lg shadow-lg border-2 border-customIcon overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="p-6">
              {/* Post Title */}
              <h2 className="text-2xl font-semibold mb-2">
                <Link to={`/posts/${post.id}`} className="hover:text-customNav transition">
                  {he.decode(post.title.rendered)}
                </Link>
              </h2>

              {/* Categories */}
              {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
                <div className="mb-4">
                  <ul className="flex flex-wrap space-x-2">
                    {post._embedded['wp:term'][0].map(category => (
                      <li key={category.id}>
                        <Link
                          to={`/posts?category=${category.id}`}
                          className="px-2 py-1 border rounded-full border-customIcon text-customLink text-sm hover:bg-customNav hover:text-white transition"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gym Icon */}
              <div className="absolute top-4 right-4">
                <FontAwesomeIcon icon={faDumbbell} className="text-customIcon" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomeBody;
