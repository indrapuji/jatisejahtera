import React, {useState, useEffect} from 'react';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import newAlert from '@components/newAlert';
import {useRouter} from 'next/router';

function Kesehatan() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.token) {
      newAlert({status: 'error', message: 'Anda belum login'});
      router.push('/');
    }
  }, []);

  const [activeButton, setActiveButton] = useState({
    true:
      'inline-block rounded bg-neutral-50 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]',
    false:
      'inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700',
  });

  const sideBarText = [
    {
      title: 'Bantuan Kacamata',
      class: activeButton.false,
      click: () => router.push('/user/kacamata'),
    },
    {
      title: 'Santunan Kematian',
      class: activeButton.false,
      click: () => router.push('/user/kematian'),
    },
    {
      title: 'Bantuan Rawat Inap',
      class: activeButton.true,
      click: () => router.push('/user/kesehatan'),
    },
    {
      title: 'Manfaat Nilai Hidup',
      class: activeButton.false,
      click: () => router.push('/user/manfaat'),
    },
  ];
  return (
    <Layout pageTitle={'KLAIM || JATISEJAHTERA'}>
      <Navigation />
      <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10'>
        <div className='relative pb-20'>
          <img
            className='object-cover w-full h-56 rounded-lg shadow-lg sm:h-96'
            src={'https://i.ibb.co/p0QFFqs/car-1.jpg'}
            alt='nature'
          />
        </div>

        <div className='grid gap-10 lg:grid-cols-3 '>
          {/* side card */}
          <div className='w-full px-8 py-4 mt-10 bg-white rounded-lg dark:bg-gray-800 lg:my-12 '>
            {sideBarText.map((item, index) => (
              <div key={index}>
                <button type='button' className={item.class} onClick={item.click}>
                  {item.title}
                </button>
              </div>
            ))}
          </div>
          <div className='col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
            <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
              <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
                Detail Profile
              </h2>
            </div>
            {/* // */}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Kesehatan;
