import React, {useEffect, useState} from 'react';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Image from 'next/image';
import Layout from '@components/Layout';
import axios from 'axios';

export default () => {
  const [dataKesehatan, setDataKesehatan] = useState();

  useEffect(() => {
    getDataKesehatan();
  }, []);

  const getDataKesehatan = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=kesehatan&status=true`,
      });
      console.log(data);
      setDataKesehatan(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout pageTitle={'REALISASI KESEHATAN || JATISEJAHTERA'}>
      <Navigation />
      <div className='flex flex-col justify-between'>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
            <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
              Realisasi Kesehatan
            </h2>
            {dataKesehatan &&
              dataKesehatan.map((item) => (
                <div key={item.id} className='max-w-4xl my-6'>
                  <Image src={item.image_url} width={700} height={1000} alt='pop up' />
                  <p className='font-bold px-2 py-8'>{item.title}</p>
                </div>
              ))}
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
};