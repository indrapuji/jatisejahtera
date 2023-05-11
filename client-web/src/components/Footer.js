import React from 'react';
import Logo from '../assets/images/logo.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='bg-emerald-600 relative'>
      <div className='px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='grid gap-16 row-gap-10 mb-8 lg:grid-cols-6 mt-36'>
          <div className='md:max-w-md lg:col-span-2'>
            <a href='/' aria-label='Go home' title='Company' className='inline-flex items-center'>
              <Image className='w-10' src={Logo} alt='logo' />
              <span className='ml-2 text-xl font-bold tracking-wide text-white uppercase'>Jati Sejahtera</span>
            </a>
            <div className='mt-4 lg:max-w-sm'>
              <p className='text-sm text-white'>Wisma Perhutani</p>
              <p className='mt-4 text-sm text-white'>
                JL. VILLA No. 1 GATOT SUBROTO Kav. 17-18 JAKARTA SELATAN 12930, Telp / Fax : 021-5252983
              </p>
              <p className='mt-4 text-sm text-white'>
                E-mail : yayasanjatisejahtera@yahoo.co.id, admin@jatisejahtera.or.id
              </p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4'>
            <div>
              <p className='font-semibold tracking-wide text-white'>Profile</p>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a
                    href='/profile'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Company Profile
                  </a>
                </li>
                <li>
                  <a
                    href='/profile/pengurus'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Kepengurusan
                  </a>
                </li>
                <li>
                  <a
                    href='/profile/cabang'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Alamat Kantor YKP3JS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className='font-semibold tracking-wide text-white'>Program</p>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a
                    href='/program/pendidikan'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Pendidikan
                  </a>
                </li>
                <li>
                  <a
                    href='/program/sosial'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Sosial
                  </a>
                </li>
                <li>
                  <a
                    href='/program/perumahan'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Perumahan
                  </a>
                </li>
                <li>
                  <a
                    href='/program/kesehatan'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Kesehatan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className='font-semibold tracking-wide text-white'>Data</p>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a
                    href='/data/pendidikan'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Realisasi Pendidikan
                  </a>
                </li>
                <li>
                  <a
                    href='/data/perumahan'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Realisasi Perumahan
                  </a>
                </li>
                <li>
                  <a
                    href='/data/kesehatan'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                  >
                    Realisasi Kesehatan
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between pt-5 pb-10 border-t-2 border-white sm:flex-row'>
          <p className='text-sm text-emerald-100'>© Copyright 2023 jatisejahtera. All rights reserved.</p>
        </div>
        <svg className='absolute inset-x-0 -top-1 text-white rotate-180' viewBox='0 0 1160 163'>
          <path
            fill='currentColor'
            d='M -166 53 L -100 76 C -40 89 76 120 196 141 C 316 162 436 152 556 119.7 C 676 88 796 34 907 59 C 1067 127 1127 93 1214 53 L 1276 13 V 162.5 H 1216 C 1156 162.5 1036 162.5 916 162.5 C 796 162.5 676 162.5 556 162.5 C 436 162.5 316 162.5 196 162.5 C 76 162.5 -44 162.5 -104 162.5 H -164 V 51 Z'
          />
        </svg>
      </div>
    </div>
  );
};

export default Footer;
