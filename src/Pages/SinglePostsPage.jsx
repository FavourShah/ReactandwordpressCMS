import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

// Function to decode HTML entities
const decodeHtmlEntities = (text) => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

const SinglePostsPage = () => {
  const { id,} = useParams(); // 
  const [post, setPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://favourezechi.com.ng/wp/wp-json/wp/v2/posts/${id}?_embed`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
  

        // Fetch next post
        fetch(`https://favourezechi.com.ng/wp/wp-json/wp/v2/posts?_embed&after=${data.date}&per_page=1`)
          .then(response => response.json())
          .then(data => setNextPost(data[0]));

        // Fetch previous post
        fetch(`https://favourezechi.com.ng/wp/wp-json/wp/v2/posts?_embed&before=${data.date}&per_page=1`)
          .then(response => response.json())
          .then(data => setPrevPost(data[0]));
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, [id]);

  if (!post) return <Spinner />;

  const postTitle = decodeHtmlEntities(post.title.rendered);
  const postContent = decodeHtmlEntities(post.content.rendered);

  return (
    <div className="container mx-auto p-4">
      {/* Back to All Posts Button */}
      <button
        onClick={() => navigate('/posts')}
        className="mb-4 px-4 py-2 border rounded-full border-customIcon text-customLink text-sm hover:bg-customNav hover:text-white transition"
      >
        Back to All Posts
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg mx-auto">
        {post._embedded && post._embedded['wp:featuredmedia'] && (
          <img
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={postTitle}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        )}

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{postTitle}</h1>

          {/* Categories */}
          {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
            <div className="mb-4">
              <ul className="flex flex-wrap space-x-2">
                {post._embedded['wp:term'][0].map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => navigate(`/posts?category=${category.id}`)}
                      className="text-blue-500 border rounded-full px-2 py-1 text-sm"
                    >
                      {decodeHtmlEntities(category.name)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="text-gray-700 mb-4">
            <div dangerouslySetInnerHTML={{ __html: postContent }} />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {prevPost && (
          <button
            onClick={() => navigate(`/posts/${prevPost.id}`)}
            className="px-4 py-2 border-customIcon text-customLink text-sm hover:bg-customNav hover:text-white transition rounded-full"
          >
            Previous
          </button>
        )}
        {nextPost && (
          <button
            onClick={() => navigate(`/posts/${nextPost.id}`)}
           className="px-4 py-2 border-customIcon text-customLink text-sm hover:bg-customNav hover:text-white transition rounded-full"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePostsPage;
