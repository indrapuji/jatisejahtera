import React, {useEffect, useState} from 'react';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import axios from 'axios';
import Logo from '@assets/images/logo.png';
import Image from 'next/image';
import DetailProfil from '@components/DetailProfil';
import DetailPendukung from '@components/DetailPendukung';
import HistoriClaim from '@components/HistoriClaim';
import SettingAkun from '@components/SettingAkun';
import {useRouter} from 'next/router';
import activeButton from '@utilities/activeButton';

function index() {
  const router = useRouter();
  const [profileData, setProfileData] = useState();
  const [dataPeserta, setDataPeserta] = useState();
  const [claimData, setClaimData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const [active, setActive] = useState('detail');

  const setButton = (actButton) => {
    setActive(actButton);
  };

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/user/profile`,
        headers: {
          token: localStorage.token,
        },
      });
      setProfileData(data);
      setDataPeserta(data.Datum);
      setClaimData(data.Claims);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const sideBarText = [
    {
      title: 'Detail',
      class: active === 'detail' ? activeButton.true : activeButton.false,
      click: () => setButton('detail'),
    },
    {
      title: 'Data Pendukung',
      class: active === 'pendukung' ? activeButton.true : activeButton.false,
      click: () => setButton('pendukung'),
    },
    {
      title: 'Histori Pengajuan',
      class: active === 'histori' ? activeButton.true : activeButton.false,
      click: () => setButton('histori'),
    },
    {
      title: 'Setting',
      class: active === 'setting' ? activeButton.true : activeButton.false,
      click: () => setButton('setting'),
    },
    {
      title: 'Logout',
      class: activeButton.false,
      click: () => logout(),
    },
  ];
  return (
    <Layout pageTitle={'USER PROFILE || JATISEJAHTERA'}>
      <Navigation />

      <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10'>
        <div className='relative pb-20'>
          <img
            className='object-cover w-full h-56 rounded-lg shadow-lg sm:h-96'
            src={'https://i.ibb.co/p0QFFqs/car-1.jpg'}
            alt='nature'
          />
          <div className='absolute bottom-16 left-5 lg:-bottom-1 lg:left-10'>
            <Image
              className='rounded-full w-24 h-24 ring-4 ring-white dark:ring-black lg:h-60 lg:w-60'
              src={Logo}
              alt='logo jatisejahtera'
            />
          </div>
          <div className='ml-32 mt-2 lg:ml-80 lg:mt-5'>
            <p className='text-black text-sm lg:text-2xl  font-bold'>Profile</p>
            <p className='text-gray-500 text-xs -mt-1 lg:text-lg lg:-mt-2 font-bold'>Update your detail</p>
          </div>
        </div>

        {/* card Pendukung */}
        {/* {profileData && ( */}
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

          {active === 'detail' && <DetailProfil profileData={profileData} dataPeserta={dataPeserta} />}
          {active === 'pendukung' && <DetailPendukung dataPeserta={dataPeserta} status={profileData.status} />}
          {active === 'histori' && <HistoriClaim data={claimData} />}
          {active === 'setting' && <SettingAkun profileData={profileData} />}
        </div>
        {/* )} */}
      </div>
      <Footer />
    </Layout>
  );
}

export default index;
