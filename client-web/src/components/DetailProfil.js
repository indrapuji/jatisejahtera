import React from 'react';
import formatDate from '@utilities/FormatDate';
import InputComponent from './InputComponent';

function DetailProfil({profileData, dataPeserta}) {
  return (
    <div className='col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
      <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
        <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
          Detail Profile
        </h2>
      </div>
      <div className='lg:pr-10 flex flex-col'>
        <div className='-mx-2 md:items-center md:flex'>
          <InputComponent title={'Nama'} valueInput={profileData.name} disabledInput={true} />
        </div>
        <div className='-mx-2 md:items-center md:flex mt-3'>
          <InputComponent title={'Nomor Induk'} valueInput={profileData.nip} disabledInput={true} />
        </div>
        <div className='-mx-2 md:items-center md:flex mt-3'>
          <InputComponent title={'Email'} valueInput={profileData.email} disabledInput={true} />
        </div>
        <div className='-mx-2 md:items-center md:flex mt-3'>
          <InputComponent title={'No Telp'} valueInput={dataPeserta.no_telp} disabledInput={true} />
        </div>
        <div className='-mx-2 md:items-center md:flex mt-3'>
          <InputComponent title={'Tanggal Lahir'} valueInput={formatDate(dataPeserta.tgl_lahir)} disabledInput={true} />
        </div>
        <div className='-mx-2 md:items-center mt-3'>
          <InputComponent title={'No KTP'} valueInput={dataPeserta.no_ktp} disabledInput={true} />
        </div>
        <div className='-mx-2 md:items-center mt-3'>
          <InputComponent title={'No BPJS'} valueInput={dataPeserta.no_bpjs} disabledInput={true} />
        </div>
        <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Nama Bank'} valueInput={dataPeserta.nama_bank} disabledInput={true} />
          </div>
          <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'No Rekening'} valueInput={dataPeserta.no_rekening} disabledInput={true} />
          </div>
        </div>
        <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Satuan Kerja'} valueInput={dataPeserta.satuan_kerja} disabledInput={true} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'KPH'} valueInput={dataPeserta.cabang} disabledInput={true} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Golongan'} valueInput={dataPeserta.golongan_pangkat} disabledInput={true} />
          </div>
        </div>
        <div className='-mx-2 md:items-center md:flex mt-3'>
          <div className='flex-1 px-2'>
            <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Alamat</label>
            <textarea
              disabled={true}
              rows='4'
              value={dataPeserta && dataPeserta.alamat}
              className='bg-gray-200 block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
        </div>
        <div className='lg:grid lg:gap-10 lg:grid-cols-2'>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Kecamatan'} valueInput={dataPeserta.kecamatan} disabledInput={true} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Kelurahan'} valueInput={dataPeserta.kelurahan} disabledInput={true} />
          </div>
        </div>
        <div className='lg:grid lg:gap-10 lg:grid-cols-3 mb-10'>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Kota'} valueInput={dataPeserta.kota} disabledInput={true} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Kodepos'} valueInput={dataPeserta.kodepos} disabledInput={true} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Provinsi'} valueInput={dataPeserta.provinsi} disabledInput={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProfil;
