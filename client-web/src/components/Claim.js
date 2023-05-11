import React from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import newAlert from './newAlert';

function Claim() {
  const router = useRouter();
  const claimData = [
    {
      id: 1,
      title: 'Santunan Kematian',
      desc:
        'Santunan kematian dibayarkan kepada ahli waris,selambat-lambatnya 14 hari kerja setelah berkas pengajuan diterima dengan lengkap dan benar oleh Yayasan.',
      status: true,
      linkTo: '/user/kematian',
    },
    {
      id: 2,
      title: 'Manfaat Nilai Hidup',
      desc:
        'Manfaat Nilai Hidup dibayarkan kepada peserta,selambat-lambatnya 14 hari kerja setelah berkas pengajuan diterima dengan lengkap dan benar oleh Yayasan.',
      status: true,
      linkTo: '/user/manfaat',
    },
    {
      id: 3,
      title: 'Bantuan Rawat Inap',
      desc:
        'Penggantian Biaya Rawat Inap dibayarkan kepada peserta,selambat-lambatnya 14 hari kerja setelah berkas pengajuan diterima dengan lengkap dan benar oleh Yayasan.',
      status: true,
      linkTo: '/user/kesehatan',
    },
    {
      id: 4,
      title: 'Bantuan Kacamata',
      desc:
        'Penggantian Pembelian Kacamata dibayarkan kepada peserta,selambat-lambatnya 14 hari kerja setelah berkas pengajuan diterima dengan lengkap dan benar oleh Yayasan.',
      status: true,
      linkTo: '/user/kacamata',
    },
  ];

  const handleAdd = async () => {
    try {
      const {value: dataNIP} = await Swal.fire({
        title: 'NIP',
        input: 'text',
        // inputLabel: "Masukkan NIP",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to write something!';
          }
        },
      });
      const {data} = await axios({
        method: 'POST',
        url: `https://ws.ykp3js.org/cek`,
        data: {
          nip: dataNIP,
          tokenkey:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJZS1AzSlNXZWIiLCJ0aW1lc3RhbXAiOjE2NjIyNzM1MDB9.7W1lr29HTvAQDYR1FUIRG3mrsyGqTVAbQe9daDeUz8k',
          act: 'klaim',
        },
      });

      if (data.status === 200) {
        history.push(`/peserta/add/${data.data.NIP}`);
      } else {
        newAlert({status: 'error', message: 'NIP tidak terdaftar / NIP salah'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-col text-center w-full mb-10'>
          {/* <h2 className='text-xs text-indigo-500 tracking-widest font-medium title-font mb-1'>
            ROOF PARTY POLAROID
          </h2> */}
          <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-500'>Pengajuan Claim</h1>
          {/* <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile
            poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing
            selfies heirloom prism food truck ugh squid celiac humblebrag.
          </p> */}
        </div>
        <div className='flex flex-wrap'>
          {claimData.map((item) => (
            <div
              key={item.id}
              className='xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60 transition ease-in-out delay-150 hover:scale-110 cursor-pointer'
              onClick={() => router.push(item.linkTo)}
            >
              <h2 className='text-lg sm:text-xl text-gray-900 font-medium title-font mb-2'>{item.title}</h2>
              <p className='leading-relaxed text-base mb-4'>{item.desc}</p>
              <div className='text-indigo-500 inline-flex items-center'>
                {item.status ? 'Ajukan' : 'Anda Sedang / Sudah Mengajukan'}
                <svg
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  className='w-4 h-4 ml-2'
                  viewBox='0 0 24 24'
                >
                  <path d='M5 12h14M12 5l7 7-7 7'></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center gap-4 rounded-lg bg-emerald-600 p-6 shadow-lg sm:flex-row sm:justify-between mt-20'>
          <strong className='text-xl sm:text-xl text-white'>Register Anggota!</strong>

          <div
            className='inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-white/90'
            onClick={() => handleAdd()}
          >
            <span className='text-sm font-medium'> mulai </span>

            <svg
              className='h-5 w-5'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Claim;
