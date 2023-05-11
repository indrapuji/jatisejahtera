import React from 'react';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Image from 'next/image';
import Layout from '@components/Layout';
import programPerumahan from '@assets/images/program_perumahan.jpg';

export default () => {
  return (
    <Layout pageTitle={'PERUMAHAN || JATISEJAHTERA'}>
      <Navigation />
      <div className='flex flex-col justify-between'>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
            <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
              Program Perumahan
            </h2>

            <div className='max-w-4xl mt-6 text-gray-500 dark:text-gray-300'>
              <Image src={programPerumahan} width={700} height={700} alt='pop up' />
            </div>
            <div className='mt-12'>
              <div className='container px-2'>
                <p className='text-justify'>
                  Yayasan mengelola dana program pemilikan rumah bagi karyawan Perum Perhutani yang masih aktif
                  khususnya Karyawan Golongan I dan Golongan II. Penyaluran dana bantuan pemilikan rumah ini diberikan
                  secara selektif di seluruh Wilayah kerja Perum Perhutani yaitu di Jawa Timur, Jawa Tengah, serta Jawa
                  Barat dan Banten. Bantuan ini diberikan secara regular setiap dua tahun, dan diberikan dalam bentuk
                  pinjaman tanpa bunga yang pengembaliannya akan diangsur oleh karyawan dalam waktu lima tahun. Pada
                  saat Karyawan memasuki masa pensiun, atau meninggal sebelum waktu pensiun, akan menerima pengembalian
                  iuran Perumahan yang nilai nya sebesar seluruh akumulasi iuran pemilikan rumah yang telah disetorkan
                  kepada yayasan.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
};
