import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  {
    src: '/assets/kofta.avif',
    title: "Malai Kofta",
    content: 'This is the content for image 3',
  },
  {
    src: '/assets/gulab.avif',
    title: "Gulab Jamun",
    content: 'This is the content for image 1',
  },
  {
    src: '/assets/vegetable.avif',
    title: "Vegetable Manchurian",
    content: 'This is the content for image 2',
  },
  {
    src: '/assets/dal makhani.avif',
    title: "Dal Makhani",
    content: 'This is the content for image 1',
  },
  {
    src: '/assets/sabudana.avif',
    title: "Sabudana Vada",
    content: 'This is the content for image 2',
  },
  {
    src: '/assets/Bhurji.avif',
    title: "Paneer Bhurji",
    content: 'This is the content for image 3',
  },
];

const FoodMenu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex); // Update current index on slide change
  };

  return (
    <div className="flex flex-col items-center">
      <i><h2 className='text-5xl font-bold leading-tight tracking-wide text-transparent text-secondary bg-clip-text bg-gradient-to-r from-black to-gray-900'>Some best Dishes</h2></i>
      <div className="w-full mt-6 ml-2 mr-2 max-w-9xl">
        <Swiper
          modules={[Navigation, Pagination]}
          onSlideChange={handleSlideChange}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={1} // Show only one image at a time
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center ml-4 mr-4">
                {/* <img
                  src={image.src}
                  alt={`Image ${index + 1}`}
                  className="w-[4000px] h-[500px] object-cover sm:max-w-[80%] md:max-w-[60%] lg:max-w-[80%] xl:max-w-[90%] 2xl:max-w-[95%]"
                /> */}

              <img
                src={image.src}
                alt={`Image ${index + 1}`}
                className="w-[4000px] h-[500px] object-cover shadow-5xl rounded-2xl sm:max-w-[80%] md:max-w-[60%] lg:max-w-[80%] xl:max-w-[90%] 2xl:max-w-[95%]" style={{boxShadow: '0 4px 15px rgba(0.5,0.5,0.5,0.5)'}}
              />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Show title of the current image */}
      <div className="w-full max-w-3xl p-4 mt-4 text-center">
        {/* <h2 className="text-xl font-semibold">{images[currentIndex].title}</h2> */}
        <h2 className="font-mono text-5xl font-bold leading-tight tracking-wide text-white rounded-2xl bg-gradient-to-r from-pink-800 to-orange-800 " style={{boxShadow: '0 4px 15px rgba(0.5,0.5,0.5,0.5)'}}>
          {images[currentIndex].title}
        </h2>

        {/* <p>{images[currentIndex].content}</p> */}
      </div>
    </div>
  );
};

export default FoodMenu;
