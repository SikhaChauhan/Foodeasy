import React, { useState } from 'react';
import FeaturedImg1 from '/assets/jalebi.jpg';
import FeaturedImg2 from '/assets/dosa.jpg';
import FeaturedImg3 from '/assets/dhokla.jpg'; 
import bg from '/assets/bg.png';

const About = () => {
  const [modalImage, setModalImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (image) => {
    setModalImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalImage(null);
  };

  return (
    <div>
      {/* Background Image Section */}
      <div 
        className='relative w-full'
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center', 
          padding: '80px 20px',
          height: '500px',
          width: '90%',
          maxWidth: '1500px', 
          margin: '50px auto', 
          // borderRadius: '50px'
        }}
      >
        <div className='flex items-center justify-center h-full'>
          <h1 className='text-5xl xl:text-6xl text-center font-bold text-[#2A3342] leading-normal xl:leading-relaxed'>
            <i>About Us</i> 
          </h1>
        </div>
        <div className='absolute inset-0 bg-black opacity-30'></div> 
      </div>

      <div className='flex flex-col gap-12 px-5 my-4 overflow-hidden md:my-20 lg:px-10 md:flex-row md:gap-20'>
        <div className='text-start sm:w-1/2'>
          <h2 className='mb-2 text-3xl font-bold mt-9 text-secondary sm:text-4xl sm:leading-relaxed'>
            <i>About Us !</i>
          </h2>
          <p className='text-xl text-[#5c5c5c]'>
            Welcome to Foodeasy!
            At Foodeasy, we believe that food is more than just sustenance; it’s an experience, a journey, and a way to connect with loved ones. Our mission is to inspire home cooks, food enthusiasts, and anyone who enjoys the culinary arts to explore, create, and share delicious recipes that bring joy to the table.
          </p>
        </div>

        <div className='relative w-full md:w-2/2 h-[500px]'>
          <div className='absolute top-0 left-0 w-1/2 p-4 h-1/2'>
            <img
              src={FeaturedImg1}
              alt='Featured Image'
              className='object-cover w-full h-full transition-transform duration-300 ease-in-out rounded-md shadow-lg cursor-pointer hover:scale-105'
              onClick={() => openModal(FeaturedImg1)}
            />
          </div>
          <div className='absolute w-1/2 p-4 top-1/4 left-1/2 h-1/2'>
            <img
              src={FeaturedImg2}
              alt='Featured Image'
              className='object-cover w-full h-full transition-transform duration-300 ease-in-out rounded-md shadow-lg cursor-pointer hover:scale-105'
              onClick={() => openModal(FeaturedImg2)}
            />
          </div>
          <div className='absolute bottom-0 left-0 w-1/2 p-4 h-1/2'>
            <img
              src={FeaturedImg3}
              alt='Featured Image'
              className='object-cover w-full h-full transition-transform duration-300 ease-in-out rounded-md shadow-lg cursor-pointer hover:scale-105'
              onClick={() => openModal(FeaturedImg3)}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='absolute inset-0 bg-black opacity-70' onClick={closeModal}></div>
          <div className='relative p-4 bg-white rounded-lg shadow-lg'>
            <img src={modalImage} alt='Modal Image' className='object-cover w-full h-auto rounded-lg' />
            <button 
              onClick={closeModal}
              className='absolute p-2 text-white bg-red-500 rounded-full top-2 right-2 focus:outline-none'
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;
