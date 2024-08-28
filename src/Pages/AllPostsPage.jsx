import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import he from 'he';
import { motion } from 'framer-motion';

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [underlineWidth, setUnderlineWidth] = useState('0');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    const url = selectedCategory
      ? `http://favourezechi.com.ng/wp/wp-json/wp/v2/posts?_embed&categories=${selectedCategory}&page=${currentPage}&per_page=6`
      : `http://favourezechi.com.ng/wp/wp-json/wp/v2/posts?_embed&page=${currentPage}&per_page=6`;

    setIsLoading(true);

    fetch(url)
      .then(response => {
        setTotalPages(parseInt(response.headers.get('X-WP-TotalPages'), 10));
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      });
  }, [selectedCategory, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleMouseEnter = () => {
    setUnderlineWidth('100%');
  };

  const handleMouseLeave = () => {
    setUnderlineWidth('0');
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center my-8">
        <h1
          className="text-4xl py-20 font-roboto flex flex-col items-center justify-center text-customNav relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faNewspaper} className="mr-3 text-customIcon" />
            <span className="relative">
              All Posts
              {/* Animated Underline */}
              <span
                className="block h-1 bg-customNav mt-1 transition-all duration-500 ease-out"
                style={{ width: underlineWidth }}
              ></span>
            </span>
          </div>
        </h1>
      </div>

      {/* Back to All Posts Button */}
      {selectedCategory && (
        <button
          onClick={() => window.location.href = '/posts'}
          className="mb-4 px-4 py-2 border rounded-full border-customIcon text-customLink text-sm hover:bg-customNav hover:text-white transition"
        >
          Back to All Posts
        </button>
      )}

      <div className="grid grid-cols-1 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {post._embedded && post._embedded['wp:featuredmedia'] && (
              <div className={`${index % 2 === 0 ? '' : 'lg:order-last'}`}>
                <img
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={he.decode(post.title.rendered)}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold mb-2">{he.decode(post.title.rendered)}</h2>

              {/* Categories */}
              {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
                <div className="mb-4">
                  <ul className="flex flex-wrap space-x-2">
                    {post._embedded['wp:term'][0].map(category => (
                      <li key={category.id}>
                        <button
                          onClick={() => window.location.href = `/posts?category=${category.id}`}
                          className="px-2 py-1 border rounded-full border-customIcon text-customLink text-sm hover:bg-customNav hover:text-white transition"
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-gray-700 mb-4 truncate-3-lines">
                <div dangerouslySetInnerHTML={{ __html: he.decode(post.excerpt.rendered) }} />
              </div>

              <Link to={`/posts/${post.id}`} className="inline-flex items-center text-blue-500 hover:text-customNav">
                Read More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-full border border-customIcon text-customLink text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-customNav hover:text-white transition'}`}
        >
          Previous
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-full border border-customIcon text-customLink text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-customNav hover:text-white transition'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPostsPage;
