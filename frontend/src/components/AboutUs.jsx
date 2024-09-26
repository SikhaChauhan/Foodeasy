import React, { useState } from 'react';
import FeaturedImg1 from '/assets/jalebi.jpg';
import FeaturedImg2 from '/assets/dosa.jpg';
import FeaturedImg3 from '/assets/dhokla.jpg'; // Use the same image for the boxes
import { Link } from 'react-router-dom';
// import bg from '/assets/bg.png';
import Modal from 'react-modal';

// Modal styles (can be customized)
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    backgroundColor: 'transparent',
  },
};

const AboutUs = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage('');
  };

  return (
    <div className='flex flex-col gap-12 px-5 my-4 overflow-hidden md:my-20 lg:px-10 md:flex-row md:gap-20'>
      
      <div className='text-start sm:w-3/2 md:w-1/2'>
        <h2 className='mb-2 text-3xl font-bold mt-9 text-secondary sm:text-4xl sm:leading-relaxed'>
          <i>About Us !</i>
        </h2>
        <p className='mb-6 text-xl text-gray-700'>
        Welcome to Foodeasy!
        At Foodeasy, we believe that food is more than just sustenance; it’s an experience, a journey, and a way to connect with loved ones. Our mission is to inspire home cooks, food enthusiasts, and anyone who enjoys the culinary arts to explore, create, and share delicious recipes that bring joy to the table.
        </p>
        <div className='lg:mt-0 lg:flex-shrink-0'>
          <div className='inline-flex mt-12'>
            <Link to="/about">
              <button className='w-full px-8 py-4 text-base font-semibold text-center text-white transition duration-200 ease-in border rounded-lg shadow bg-gradient-to-r from-pink-500 to-pink-600 hover:bg-btnColor text-secondary hover:ease-in-out hover:text-black focus:outline-none'>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>
      

      <div className='relative w-full md:w-2/2 h-[500px]'>
        {/* Image Boxes */}
        <div className='absolute top-0 left-0 w-1/2 p-4 h-1/2'>
          <img 
            src={FeaturedImg1} 
            alt='Featured Image' 
            className='object-cover w-full h-full transition duration-300 rounded-md shadow-lg cursor-pointer hover:opacity-75'
            onClick={() => openModal(FeaturedImg1)}
          />
        </div>
        <div className='absolute w-1/2 p-4 top-1/4 left-1/2 h-1/2'>
          <img 
            src={FeaturedImg2} 
            alt='Featured Image' 
            className='object-cover w-full h-full transition duration-300 rounded-md shadow-lg cursor-pointer hover:opacity-75'
            onClick={() => openModal(FeaturedImg2)}
          />
        </div>
        <div className='absolute bottom-0 left-0 w-1/2 p-4 h-1/2'>
          <img 
            src={FeaturedImg3} 
            alt='Featured Image' 
            className='object-cover w-full h-full transition duration-300 rounded-md shadow-lg cursor-pointer hover:opacity-75'
            onClick={() => openModal(FeaturedImg3)}
          />
        </div>
      </div>

      {/* Modal for larger view */}
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <div className='relative'>
          <button 
            onClick={closeModal}
            className='absolute p-2 text-white bg-gray-800 rounded-full top-2 right-2'
          >
            &times;
          </button>
          <img 
            src={modalImage} 
            alt='Large View' 
            className='object-cover w-full h-full'
          />
        </div>
      </Modal>
    </div>
  );
}

export default AboutUs;








