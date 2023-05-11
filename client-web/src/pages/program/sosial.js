import React from 'react';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Image from 'next/image';
import Layout from '@components/Layout';
import programSosial from '@assets/images/program_sosial.jpg';

export default () => {
  return (
    <Layout pageTitle={'SOSIAL || JATISEJAHTERA'}>
      <Navigation />
      <div className='flex flex-col justify-between'>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
            <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
              Program Sosial
            </h2>

            <div className='max-w-4xl mt-6 text-gray-500 dark:text-gray-300'>
              <Image src={programSosial} width={700} height={700} alt='pop up' />
            </div>
            <div className='mt-12'>
              <p className='font-bold px-2 py-8'>
                Beberapa kegiatan dibidang Sosial dan Kemanusiaan yang diselenggarakan oleh Yayasan diantaranya:
              </p>
              <ol className='container list-decimal text-left px-2'>
                <li>Memberikan santunan kematian bagi pegawai dan pensiunan Perum Perhutani.</li>
                <li>Mengelola Panti Asuhan Rimba Bakti di Semarang</li>
                <li>
                  Memberikan santunan Nilai Hidup bagi pensiunan yang tidak pernah mengajukan klaim Bantuan Kesehatan
                  selama masa perlindungan.
                </li>
                <li>
                  Mengelola serta mengembangkan dana kesehatan dan dana perumahan yang diperoleh dari Perum Perhutani
                </li>
                <li>
                  Menjalankan usaha-usaha lain yang dianggap perlu dan bermanfaat sepanjang sesuai dengan maksud dan
                  tujuan yayasan serta sesuai dengan peraturan dan perundangan yang berlaku.
                </li>
                <li>Memberi bantuan kepada korban bencana alam</li>
                <li>Memberi bantuan kepada tuna wisma, fakir miskin, dan yatim piatu</li>
              </ol>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
};
