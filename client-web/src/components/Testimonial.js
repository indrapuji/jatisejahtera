import React, {useEffect, useState} from 'react';

import {motion} from 'framer-motion';

import axios from 'axios';

function Testimonial() {
  const [dataTesti, setDataTesti] = useState();

  const intoVarian = {
    hide: {
      opacity: 0,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 2,
      },
      scale: 1,
    },
  };

  useEffect(() => {
    getTesti();
  }, []);

  const getTesti = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=testimoni&status=true`,
      });
      console.log(data);
      setDataTesti(data);
    } catch (error) {
      console.log(error);
    }
  };
  const SlidesTestimonial = [
    {
      url:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.',
      name: 'Ronik Ederson',
      position: 'Marketing Manager at Stech',
    },
    {
      url:
        'https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda',
      name: 'Ema Watson',
      position: 'Marketing Manager at Stech',
    },
    {
      url:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.',
      name: 'Robert',
      position: 'CTO, Robert Consultency',
    },
    {
      url:
        'https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.',
      name: 'Jeny Doe',
      position: 'CEO, Jeny Consultency',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstIndex = currentIndex === 0;
    const newIndex = isFirstIndex ? dataTesti.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastIndex = currentIndex === dataTesti.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <section className='bg-white dark:bg-gray-900'>
      {dataTesti && (
        <div className='relative flex'>
          <div className='min-h-screen lg:w-1/3'></div>
          <div className='hidden w-3/4 min-h-screen bg-slate-100 dark:bg-gray-800 lg:block'></div>

          <div className='container flex flex-col justify-center w-full min-h-screen px-6 py-10 mx-auto lg:absolute lg:inset-x-0'>
            <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>
              Apa Kata Mereka <br />
              tentang <span className='text-blue-500'>Jatisejahtera</span>
            </h1>

            <motion.div
              className='mt-10 lg:mt-20 lg:flex lg:items-center'
              initial='hide'
              whileInView='show'
              exit='hide'
              variants={intoVarian}
            >
              <img
                className='object-cover object-center w-full lg:w-[32rem] rounded-lg h-96'
                src={dataTesti[currentIndex].image_url}
                alt=''
              />

              <div className='mt-8 lg:px-10 lg:mt-0'>
                <p className='max-w-lg mt-6 text-gray-500 dark:text-gray-400'>“ {dataTesti[currentIndex].desc} ”</p>

                <h3 className='mt-6 text-lg font-medium text-blue-500'>{dataTesti[currentIndex].title}</h3>
                <p className='text-gray-600 dark:text-gray-300'>{dataTesti[currentIndex].subtitle}</p>
              </div>
            </motion.div>

            <div className='flex items-center justify-between mt-12 lg:justify-start'>
              <button
                onClick={prevSlide}
                title='left arrow'
                className='p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                title='right arrow'
                className='p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6 hover:bg-gray-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Testimonial;
