import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const PostCard = ({ post }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser._id}`)) || [];
      const isPostFavorited = favorites.some(favPost => favPost._id === post._id);
      setIsFavorited(isPostFavorited);
    }
  }, [post, currentUser]);

  const handleFavoriteToggle = () => {
    if (!currentUser) {
      alert('Please sign in to add favorites.');
      return;
    }

    let favorites = JSON.parse(localStorage.getItem(`favorites_${currentUser._id}`)) || [];

    if (isFavorited) {
      favorites = favorites.filter(favPost => favPost._id !== post._id);
    } else {
      const postWithUserId = { ...post, userId: currentUser._id };
      favorites.push(postWithUserId);
    }

    localStorage.setItem(`favorites_${currentUser._id}`, JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[300px] md:w-[350px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[200px] w-full object-cover group-hover:h-[180px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='flex flex-col gap-2 p-3'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span className='text-sm italic'>{post.category}</span>
        {currentUser && (
          <button
            className={`z-10 absolute right-3 top-3 ${isFavorited ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleFavoriteToggle}
          >
            {isFavorited ? '❤️' : '🖤'} 
          </button>
        )}
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          View Post
        </Link>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
