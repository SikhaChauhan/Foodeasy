import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useSelector((state) => state.user); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/post/getposts');
        setPosts(response.data.posts);
      } catch (err) {
        setError('Error loading posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    if (currentUser) {
      const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser._id}`)) || [];
      setFavorites(savedFavorites);
    }
  }, [currentUser]);

  const toggleFavorite = (post) => {
    if (!currentUser) {
      alert('Please sign in to add favorites.');
      return;
    }

    let updatedFavorites;

    if (favorites.some((favPost) => favPost._id === post._id)) {
      updatedFavorites = favorites.filter((favPost) => favPost._id !== post._id);
    } else {
      updatedFavorites = [...favorites, post];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites_${currentUser._id}`, JSON.stringify(updatedFavorites));
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-4 text-5xl font-bold text-center">All Posts</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.length ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col sm:ml-9 h-[500px] transition-shadow duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl cursor-pointer"
            >
              {post.image && (
                <Link to={`/post/${post.slug}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full rounded-t-lg h-60"
                  />
                </Link>
              )}
              <div className="flex flex-col flex-1 p-4">
                <h2 className="mb-2 text-xl font-semibold text-gray-800">{post.title}</h2>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-black">{post.category}</p>
                  {currentUser && (
                    <button
                      className={`px-4 py-2 rounded-md ${
                        favorites.some((favPost) => favPost._id === post._id)
                          // ? 'bg-red-500 text-white'
                          // : 'bg-gray-200 text-black'
                      }`}
                      onClick={() => toggleFavorite(post)}
                    >
                      {favorites.some((favPost) => favPost._id === post._id) ? '❤️' : '🖤'}
                    </button>
                  )}
                </div>
                <Link to={`/post/${post.slug}`}>
                  <button className="w-full px-4 py-2 mt-[80px] text-white rounded-md bg-gradient-to-br from-black via-gray-900 to-gray-700 hover:bg-gray-800">
                    View Post
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
