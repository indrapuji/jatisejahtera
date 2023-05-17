import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';

function Program({bkgClr}) {
  const router = useRouter();

  const [bkg, setBkg] = useState();

  useEffect(() => {
    if (bkgClr) {
      setBkg(`bg-${bkgClr}`);
    } else {
      setBkg('bg-emerald-600');
    }
  }, []);

  const programData = [
    {
      id: 1,
      images: 'https://i.ibb.co/cFtn1T5/pendidikanasuransi.jpg',
      text: 'Pendidikan',
      linkTo: '/program/pendidikan',
    },
    {
      id: 2,
      images: 'https://i.ibb.co/029HZxw/sosialasuransi.jpg',
      text: 'Sosial',
      linkTo: '/program/sosial',
    },
    {
      id: 3,
      images: 'https://i.ibb.co/v4Z5g3S/rumahasuransi.jpg',
      text: 'Perumahan',
      linkTo: '/program/perumahan',
    },
    {
      id: 4,
      images: 'https://i.ibb.co/gyYnqy6/kesehatanasuransi.jpg',
      text: 'Kesehatan',
      linkTo: '/program/kesehatan',
    },
  ];

  const introVarian = {
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

  return (
    <div className={bkg}>
      <motion.div
        initial='hide'
        whileInView='show'
        exit='hide'
        variants={introVarian}
        className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'
      >
        <div className='mb-10 md:mb-12'>
          <div className='max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12'>
            <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
              Program
            </h2>
          </div>
        </div>

        <div className='relative px-4 py-6 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
          <div className='grid gap-8 lg:grid-cols-4 sm:max-w-sm sm:mx-auto lg:max-w-full'>
            {programData.map((item) => (
              <div
                key={item.id}
                className='flex flex-col items-center justify-center w-full max-w-sm mx-auto transition ease-in-out delay-100 hover:scale-110 cursor-pointer'
                onClick={() => router.push(item.linkTo)}
              >
                <div
                  className='w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md'
                  style={{
                    backgroundImage: `url(${item.images}`,
                  }}
                />

                <div className='absolute w-50 top-10 bg-white border-2 rounded-lg drop-shadow-2xl md:w-60 dark:bg-gray-800 hidden md:block'>
                  <h3 className='py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white'>
                    {item.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Program;
