import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard.jsx';

const FavoritePosts = () => {
  const [favoritePosts, setFavoritePosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user); 

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser._id}`)) || [];

    setFavoritePosts(favorites);
  }, [currentUser]); 

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">My Favorite Posts</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favoritePosts.length > 0 ? (
          favoritePosts.map(post => (
            <div key={post._id} className="flex justify-center">
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">You have no favorite posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritePosts;
