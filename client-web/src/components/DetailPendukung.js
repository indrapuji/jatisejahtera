import React, {useState} from 'react';
import InputComponent from './InputComponent';
import formatDate from '@utilities/FormatDate';
import {useRouter} from 'next/router';

function DetailPendukung({dataPeserta, status}) {
  const router = useRouter();
  return (
    <div className='col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
      {!status ? (
        <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
            Anda belum melakukan update
          </h2>

          <p className='font-bold text-sky-500 cursor-pointer' onClick={() => router.push('/user/update')}>
            Updata sekarang
          </p>
        </div>
      ) : (
        <div>
          <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
            <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
              Data Pendukung
            </h2>
          </div>
          <div className='lg:pr-10 flex flex-col'>
            <div className='-mx-2 md:items-center'>
              <InputComponent title={'Nama Pasangan'} value={dataPeserta.nama_pasangan} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'Tanggal Lahir Pasangan'}
                value={dataPeserta?.tgl_lahir_pasangan ? formatDate(dataPeserta?.tgl_lahir_pasangan) : ''}
                disabledInput={true}
              />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No Telp Pasangan'} value={dataPeserta.no_telp_pasangan} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No KTP Pasangan'} value={dataPeserta.no_ktp_pasangan} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No BPJS Pasangan'} value={dataPeserta.no_bpjs_pasangan} disabledInput={true} />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nama Bank Pasangan'}
                  value={dataPeserta.nama_bank_pasangan}
                  disabledInput={true}
                />
              </div>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'No Rekening Pasangan'}
                  value={dataPeserta.no_rekening_pasangan}
                  disabledInput={true}
                />
              </div>
            </div>
          </div>
          <hr className='mb-5 border-gray-300 my-10' />
          <div className='lg:pr-10 flex flex-col mt-8'>
            <div className='-mx-2 md:items-center'>
              <InputComponent title={'Nama Anak'} value={dataPeserta.nama_anak} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'Tanggal Lahir Anak'}
                value={dataPeserta?.tgl_lahir_anak ? formatDate(dataPeserta?.tgl_lahir_anak) : ''}
                disabledInput={true}
              />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No Telp Anak'} value={dataPeserta?.no_tlp_anak} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No KTP Anak'} value={dataPeserta.no_ktp_anak} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No BPJS Anak'} value={dataPeserta.no_bpjs_anak} disabledInput={true} />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Nama Bank Anak'} value={dataPeserta.nama_bank_anak} disabledInput={true} />
              </div>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'No Rekening Anak'} value={dataPeserta.no_rekening_anak} disabledInput={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPendukung;
