import React from 'react';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Image from 'next/image';
import Layout from '@components/Layout';
import programPendidikan from '@assets/images/program_pendidikan.jpg';

export default () => {
  const manfaatData = [
    {
      tingkat: 'Tingkat SD',
      nominal: '50.000',
    },
    {
      tingkat: 'Tingkat SLTP',
      nominal: '60.000',
    },
    {
      tingkat: 'Tingkat SLTA',
      nominal: '75.000',
    },
    {
      tingkat: 'Perguruan Tinggi',
      nominal: '100.000',
    },
  ];
  return (
    <Layout pageTitle={'PENDIDIKAN || JATISEJAHTERA'}>
      <Navigation />
      <div className='flex flex-col justify-between'>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
            <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
              Program Pendidikan
            </h2>

            <div className='max-w-4xl mt-6 text-gray-500 dark:text-gray-300'>
              <Image src={programPendidikan} width={700} height={700} alt='pop up' />
            </div>
            <div className='mt-12'>
              <p className='font-bold px-2 py-8'>
                Beberapa kegiatan dibidang pendidikan yang diselenggarakan oleh Yayasan di antaranya:
              </p>
              <ol className='container list-decimal text-left px-2'>
                <li>
                  Memberikan bantuan pendidikan kepada putra/putri karyawan dan pensiunan Perum Perhutani yang
                  berprestasi.
                </li>
                <li>
                  Mengelola Wisma Putra Rimba untuk membantu menyediakan tempat tinggal bagi putra/putri
                  karyawan/pensiunan Perum Perhutani yang melanjutkan pendidikan di Surabaya.
                </li>
                <li>Membantu pengembangan dan pembinaan lembaga Pendidikan dilingkup Perum Perhutani.</li>
                <li>Menyelenggarakan Pendidikan Non-formal (TK/TPA/PAUD)</li>
              </ol>
            </div>
            <div className='mt-12'>
              <h2 className='font-bold px-2 py-8 text-3xl'>Bantuan Pendidikan</h2>
              <h2 className='font-bold text-lg'>Peruntukan</h2>
              <div>
                <p>Putra/Putri Siswa/Mahasiswa dari Pensiunan atau Janda Pensiunan Karyawan Perum Perhutani</p>
                <p>Karyawan, Golongan A dan Golongan I, Golongan II yang tidak menjabat</p>
                <p>Guru Sekolah Taruna Rimba yang sedang menempuh S1 bidang pendidikan</p>
              </div>
            </div>
            <div className='mt-12'>
              <h2 className='font-bold px-2 py-8 text-3xl'>Manfaat</h2>
              <h2 className='font-bold pb-8 text-sm'>Bantuan Pendidikan dengan nilai</h2>
              <div className='bg-gray-100'>
                <div className='relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                  {manfaatData.map((item, index) => (
                    <div className='flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl'>
                      <div className='p-5'>
                        <p className='mb-2 font-bold'>{item.tingkat}</p>
                        <p className='text-sm leading-5 text-gray-900'>Rp. {item.nominal},-/bln</p>
                      </div>
                      <div className='w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
};
