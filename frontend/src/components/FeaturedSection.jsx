import React from 'react';
import FeaturedImg from '/assets/rajma.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const FeaturedSection = () => {
  return (
    <div className='flex flex-col items-center justify-between gap-12 px-5 my-4 overflow-hidden md:flex-row sm:my-20 md:gap-20 lg:px-10'>
      {/* Image Section */}
      <div className='relative flex-shrink-0 w-full md:w-1/2'>
        <div className='absolute px-3 py-1 tracking-wider uppercase bg-white rounded-md top-4 left-5 text-secondary'>Featured Recipe</div>
        <img
          src={FeaturedImg}
          alt='Featured Image'
          className='w-full h-auto rounded-md object-cover md:max-w-[100%]'
        />
      </div>

      {/* Text Content */}
      <div className='text-start sm:w-full md:w-1/2'>
      <i><h2 className='text-3xl font-bold text-secondary sm:text-4xl sm:leading-relaxed'>
          Rajma Chawal
        </h2></i>
        <p className='mb-6 text-xl text-gray-700'>This is a Punjabi household favourite. Growing up in my parents home, this dish was often on the menu for our much anticipated Saturday lunch. When Rajma Chawal was prepared at our school cafeteria the news would spread like wildfire and we would rush to the lunch hall with excitement. <br/>
           This is one of those dishes where you can easily say "Everybody loves Rajma Chawal".<br/>
           Think of this as North India's 'Chili sin Carne' but one where you won't miss the meat at all.<br/>

            Always served with jeera rice and optionally with some yoghurt and fresh onion slices.
          </p>
        <div className='lg:mt-0 lg:flex-shrink-0'>
          <div className='inline-flex mt-12'>
            <Link to="/post/rajma-chawal">
              <button className='w-full px-8 py-4 text-base font-semibold text-center text-white transition duration-200 ease-in border rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:bg-btnColor text-secondary hover:text-black focus:outline-none'>
                View Recipe
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
