import React from 'react';

function NewsRight({data}) {
  console.log(data);
  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <div className='grid gap-10 lg:grid-cols-2'>
        <div>
          <img className='object-cover w-full h-56 rounded shadow-lg sm:h-96' src={data.image_url} alt='news' />
        </div>
        <div className='lg:pr-10'>
          <h5 className='mb-4 text-4xl font-extrabold leading-none'>{data.title}</h5>
          <p className='mb-6 text-gray-900'>{data.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsRight;
