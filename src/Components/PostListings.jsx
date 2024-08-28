import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import he from 'he';

const PostListings = () => {
  const [posts, setPosts] = useState([]);
  const [underlineWidth, setUnderlineWidth] = useState('0');

  useEffect(() => {
    fetch('http://favourezechi.com.ng/wp/wp-json/wp/v2/posts?_embed&per_page=4')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handleMouseEnter = () => {
    setUnderlineWidth('100%');
  };

  const handleMouseLeave = () => {
    setUnderlineWidth('0'); // Reset the underline width to animate again on the next hover
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-roboto flex flex-col items-center justify-center text-customNav relative">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faNewspaper} className="mr-3 text-customIcon" />
            <span
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Posts
              {/* Animated Custom Navigation Borderline */}
              <span
                className="block h-1 bg-customNav mt-1 mx-auto transition-all duration-500 ease-out"
                style={{ width: underlineWidth }}
              ></span>
            </span>
          </div>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Featured Image */}
            {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && (
              <img
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={he.decode(post.title.rendered)}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-6">
              {/* Post Title */}
              <h2 className="text-xl font-semibold mb-2">
                <Link to={`/posts/${post.id}`} className="hover:text-customNav transition">
                  {he.decode(post.title.rendered)}
                </Link>
              </h2>

              {/* Categories */}
              {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
                <div className="mb-4">
                  <ul className="flex flex-wrap space-x-2">
                    {post._embedded['wp:term'][0].map((category) => (
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

              {/* Post Content */}
              <div
                className="text-gray-700 mb-4 truncate-3-lines"
                dangerouslySetInnerHTML={{ __html: he.decode(post.excerpt.rendered) }}
              />

              <Link
                to={`/posts/${post.id}`}
                className="inline-flex items-center text-blue-500 hover:text-customNav transition relative group"
              >
                Read More
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 icon-arrow transition-transform duration-300 group-hover:translate-x-2 group-active:scale-125 group-active:text-customNav"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Button to All Posts Page */}
      <div className="text-center mt-8">
        <Link
          to="/posts"
          className="px-6 py-2 border-2 border-customIcon text-customNav rounded-full text-lg hover:bg-customNav hover:text-white transition"
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
};

export default PostListings;
