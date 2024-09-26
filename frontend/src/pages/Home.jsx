import React, { useState, useEffect } from 'react';
import FeaturedSection from '../components/FeaturedSection';
import bg from '/assets/bg.png';
import AboutUs from '../components/AboutUs';
import PostCard from '../components/PostCard';
import FoodMenu from '../components/FoodMenu';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Chef from './Chef';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Select');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [showMore, setShowMore] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (query = {}) => {
    setLoading(true);
    const urlParams = new URLSearchParams(query);
    const res = await fetch(`/api/post/getposts?${urlParams.toString()}`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    setPosts(data.posts);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '' && category === 'Select') {
      setError('Type something to search or choose a category');
      return;
    }
    setError('');
    setSearched(true);

    const query = {};
    if (searchTerm) query.searchTerm = searchTerm;
    if (category !== 'Select') query.category = category;

    fetchPosts(query);
  };

  return (
    <>

<div
  className='flex flex-col items-center justify-center px-5 mt-5 mb-5 xl:px-5'
  style={{
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '80px 20px',
    height: '500px',
    width: '90%',
    maxWidth: '1500px', 
    margin: '50px auto', 
    borderRadius: '20px'
  }}
>


        <h1 className='mt-6 mb-10 text-5xl xl:text-6xl text-center font-bold text-[#2A3342] leading-normal xl:leading-relaxed'>
          <span className='text-orange-500'>Food</span><span className='text-pink-800'>easy</span>
        </h1>
        <form onSubmit={handleSubmit} className='relative flex flex-col items-center w-full max-w-3xl p-4 rounded'>
          <div className="flex items-center w-full mb-4">
            <input
              className='outline-none w-full placeholder:text-[#1b2629] mr-2 rounded'
              type='search'
              placeholder='Search for the Recipe or Category'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-3 py-2 text-gray-700 bg-white border border-black rounded outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Select">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
              <option value="Drinks">Drinks</option>
            </select>

            <button
              type='submit'
              className='px-4 py-2 ml-2 text-white bg-orange-500 rounded'
            >
              Search
            </button>
          </div>

          {/* Error message below search bar */}
          {error && <p className='font-semibold text-pink-500'>{error}</p>}
        </form>
      </div>

      {/* Display Posts Section */}
      {searched && (
        <div className='w-full mx-auto rounded-lg shadow-lg max-w-9xl p-7 shadow-black'>
          <h2 className='mb-4 text-2xl font-semibold'>Search Results</h2>
          {loading && <p>Loading...</p>}
          {!loading && posts.length === 0 && <p>No posts found.</p>}

          {!loading && posts.length > 0 && (
            <div style={{ paddingBottom: '30px' }}> {/* Add padding below Swiper for spacing */}
              <Swiper
                spaceBetween={30}
                slidesPerView={4}
                navigation={true}
                pagination={{ clickable: true, el: '.custom-swiper-pagination' }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
              >
                {posts.map((post) => (
                  post._id && (
                    <SwiperSlide key={post._id}>
                      <PostCard post={post} />
                    </SwiperSlide>
                  )
                ))}
              </Swiper>
            </div>
          )}
        </div>
      )}

      {/* Featured Section */}
      <div>
        <FeaturedSection />
      </div>
      <div>
        <AboutUs />
      </div>
      <div>
        <Chef/>
      </div>
      <div className='mb-6'>
      <FoodMenu /> 
      </div>
    </>
  );
}

export default HomePage;









