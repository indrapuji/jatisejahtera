import React, {useEffect, useState} from 'react';
import NewsRight from '@components/NewsRight';
import NewsLeft from '@components/NewsLeft';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';

import axios from 'axios';

function index() {
  const [newsData, setNewsData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=berita&status=true`,
      });
      setNewsData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle={'BERITA || JATISEJAHTERA'}>
      <Navigation />
      <div className='flex flex-col justify-between mt-10'>
        <div className='max-w-xl md:mx-auto sm:text-center lg:max-w-2xl px-5'>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
            <span className='relative inline-block'>
              <svg
                viewBox='0 0 52 24'
                fill='currentColor'
                className='absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block'
              >
                <defs>
                  <pattern id='2feffae2-9edf-414e-ab8c-f0e6396a0fc1' x='0' y='0' width='.135' height='.30'>
                    <circle cx='1' cy='1' r='.7' />
                  </pattern>
                </defs>
                <rect fill='url(#2feffae2-9edf-414e-ab8c-f0e6396a0fc1)' width='52' height='24' />
              </svg>
              <span className='relative'>Berita</span>
            </span>
          </h2>
          <p className='inline-block py-px text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400'>
            Seputar Informasi Yayasan JATISEJAHTERA
          </p>
        </div>
        {newsData &&
          newsData.map((item, index) =>
            index % 2 === 0 ? <NewsRight key={item.id} data={item} /> : <NewsLeft key={item.id} data={item} />,
          )}
        <Footer />
      </div>
    </Layout>
  );
}

export default index;
