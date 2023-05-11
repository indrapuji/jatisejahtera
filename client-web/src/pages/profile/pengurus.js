import React, {useEffect, useState} from 'react';
import Navigation from '@components/Navigation';
import Footer from '../../components/Footer';

import Image from 'next/image';
import Layout from '@components/Layout';
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
    <Layout pageTitle={'CABANG || JATISEJAHTERA'}>
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

        <Footer />
      </div>
    </Layout>
  );
};
