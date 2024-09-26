import React from 'react';
import FeaturedImg1 from '/assets/cheff.jpg'; 

import { Link } from 'react-router-dom';


const Chef = () => {

  return (
    <div className='flex flex-col gap-5 px-5 my-4 overflow-hidden md:my-20 lg:px-10 md:flex-row md:gap-20'>
      <div className='relative w-full md:w-1/2 h-[500px] md:h-[600px] lg:h-[700px]'>
        {/* Image Box */}
        <div className='absolute top-0 left-0 w-full h-full p-4'>
          <img 
            src={FeaturedImg1} 
            alt='Featured Image' 
            className='object-cover w-full h-full transition duration-300 rounded-md shadow-lg '
          />
        </div>
      </div>

      <div className='text-start sm:w-3/2 md:w-1/2'>
        <h2 className='mb-2 text-3xl font-bold mt-9 text-secondary sm:text-4xl sm:leading-relaxed'>
          <i>Everyone Can Be A<br/>
          Chef In Their Own Kitchen
          </i>
        </h2>
        <p className='text-xl text-gray-700 '>
      <span className='text-pink-600 text-bold'>"Everyone Can Be a Chef in Their Own Kitchen"</span> is more than just a motto—it’s the heart of Foodeasy. Whether you’re a seasoned cook or just starting out, our blog is designed to inspire creativity in the kitchen. With easy-to-follow recipes, tips for perfecting your culinary skills, and step-by-step guides, we believe anyone can whip up delicious meals right at home. At Foodeasy, we’re here to show you that with the right ingredients and a little passion, you can transform everyday cooking into an exciting and rewarding experience!        </p>

        <div className='lg:mt-0 lg:flex-shrink-0'>
          <div className='inline-flex mt-12'>
            <Link to="/allPost">
              <button className='w-full px-8 py-4 text-base font-semibold text-center text-white transition duration-200 ease-in border rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:bg-btnColor text-secondary hover:text-black focus:outline-none'>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chef;
