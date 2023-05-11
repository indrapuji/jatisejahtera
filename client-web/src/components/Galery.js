import React from 'react';

function Galery({data, showMore}) {
  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <div className='grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2'>
        {data &&
          data.map((item) => (
            // <div onClick={() => setShow(item.image_url)}>
            <div
              key={item.id}
              className='relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl'
            >
              <img
                // className='object-cover w-full h-56 md:h-64 xl:h-80'
                className='lg:h-48 md:h-36 w-full object-cover object-center'
                src={item.image_url}
                alt=''
              />
              <div className='absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100'>
                <p className='mb-4 text-lg font-bold text-gray-100'>{item.title}</p>
                <p className='text-sm tracking-wide text-gray-300'>{item.desc}</p>
              </div>
            </div>
            // </div>
          ))}
      </div>
      {showMore && (
        <div className='text-center'>
          <a
            href='/galeri'
            aria-label=''
            className='inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800'
          >
            View gallery
            <svg className='inline-block w-3 ml-2' fill='currentColor' viewBox='0 0 12 12'>
              <path d='M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z' />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

export default Galery;
