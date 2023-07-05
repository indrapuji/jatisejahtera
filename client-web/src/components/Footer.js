import React from 'react'
import Logo from '../assets/images/logo.png'
import Image from 'next/image'

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
            <div className='flex mt-6 -mx-2'>
              <a
                aria-label='instagram'
                href='https://instagram.com/ykp3js?igshid=NTc4MTIwNjQ2YQ=='
                className='mx-2 text-white transition-colors duration-300 dark:text-white hover:text-blue-500 dark:hover:text-blue-400'
                target='_blank'
                rel='noopener noreferrer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-instagram'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z' />
                </svg>
              </a>

              <a
                aria-label='whatsapp'
                href='https://wa.me/6282211115076'
                className='mx-2 text-white transition-colors duration-300 dark:text-white hover:text-blue-500 dark:hover:text-blue-400'
                target='_blank'
                rel='noopener noreferrer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-whatsapp'
                  viewBox='0 0 16 16'
                >
                  <path d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z' />
                </svg>
              </a>
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
            <div>
              <p className='font-semibold tracking-wide text-white'>External Link</p>
              <ul className='mt-2 space-y-2'>
                <li>
                  <a
                    href='https://www.perhutani.co.id/'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Perhutani
                  </a>
                </li>
                <li>
                  <a
                    href='https://www.dapenperhutani.com/'
                    className='text-emerald-100 transition-colors duration-300 hover:text-deep-purple-accent-400'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Dapen Perhutani
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
  )
}

export default Footer
