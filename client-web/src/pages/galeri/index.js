import React, {useEffect, useState} from 'react';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Galery from '@components/Galery';
import Footer from '@components/Footer';
import axios from 'axios';

function index() {
  const [galeriData, setGaleriData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=galeri&status=true`,
      });
      setGaleriData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout pageTitle={'PROGRAM || JATISEJAHTERA'}>
      <Navigation />
      <div className='max-w-xl md:mx-auto text-center lg:max-w-2xl px-5'>
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
            <span className='relative'>Galeri</span>
          </span>
        </h2>
        <p className='inline-block py-px text-xs font-semibold tracking-wider text-teal-900 uppercase'>
          Galeri Yayasan JATISEJAHTERA
        </p>
      </div>
      <Galery data={galeriData && galeriData} />
      <Footer />
    </Layout>
  );
}

export default index;
