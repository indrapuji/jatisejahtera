import React, {useEffect, useState} from 'react';
import Navigation from '@components/Navigation';
import Perwakilan from '@components/Perwakilan';
import Footer from '../../components/Footer';

import Image from 'next/image';
import Layout from '@components/Layout';
import map from '@assets/images/map_ykp3js.png';
import axios from 'axios';

export default () => {
  const [dataPengurus, setDataPengurus] = useState([]);
  useEffect(() => {
    getPengurus();
  }, []);
  const getPengurus = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=struktur&status=true`,
      });
      setDataPengurus(data[0].image_url);
      console.log(data[0].image_url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout pageTitle={'PROFILE || JATISEJAHTERA'}>
      <Navigation />
      <div className='flex flex-col justify-between'>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-2 py-12 mx-auto text-center'>
            <h2 className='max-w-3xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white mb-8'>
              Susunan Pembina, Pengawas, dan Pengurus YKP3 Jatisejahtera
            </h2>

            <div className='max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300'>
              <Image src={dataPengurus} width={1500} height={500} alt='struktur' priority={true} />
            </div>
          </div>
        </section>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
            <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
              Kantor YKP3JS
            </h2>

            <div className='max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300'>
              <Image src={map} width={1000} height={500} alt='pop up' priority={true} />
            </div>
          </div>
        </section>
        <div className='px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8'>
          <div className='flex flex-col items-start max-w-screen-sm md:flex-row sm:mx-auto'>
            <div>
              <h1 className='mt-4 text-l font-semibold text-gray-800 dark:text-white'>KANTOR PUSAT</h1>
              <p className='mt-2 text-gray-500 dark:text-gray-400 text-sm'>D/A WISMA PERHUTANI</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>JALAN VILLA NO.1 GATOT SOBROTO</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>KAV. 17 – 18 JAKARTA SELATAN</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>TLP. 62.21.5252983, FAX. 62.21.5252983</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>yayasanjatisejahtera@yahoo.co.id</p>
            </div>
          </div>
        </div>
        <Perwakilan />
        <Footer />
      </div>
    </Layout>
  );
};
