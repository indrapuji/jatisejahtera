import React, {useEffect, useState} from 'react';
import InputComponent from './InputComponent';
import formatDate from '@utilities/FormatDate';

function DetailPendukung({dataPeserta}) {
  const [updateData, setUpdateData] = useState(true);
  console.log(dataPeserta);

  useEffect(() => {
    if (dataPeserta.nama_pasangan) {
      setUpdateData(false);
    } else {
      setUpdateData(true);
    }
  }, []);
  return (
    <div className='col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
      {updateData ? (
        <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
            Anda belum melakukan update
          </h2>
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
              <InputComponent title={'Nama Pasangan'} valueInput={dataPeserta.nama_pasangan} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'Tanggal Lahir Pasangan'}
                valueInput={dataPeserta?.tgl_lahir_pasangan ? formatDate(dataPeserta?.tgl_lahir_pasangan) : ''}
                disabledInput={true}
              />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent
                title={'No Telp Pasangan'}
                valueInput={dataPeserta.no_telp_pasangan}
                disabledInput={true}
              />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No KTP Pasangan'} valueInput={dataPeserta.no_ktp_pasangan} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent
                title={'No BPJS Pasangan'}
                valueInput={dataPeserta.no_bpjs_pasangan}
                disabledInput={true}
              />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nama Bank Pasangan'}
                  valueInput={dataPeserta.nama_bank_pasangan}
                  disabledInput={true}
                />
              </div>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'No Rekening Pasangan'}
                  valueInput={dataPeserta.no_rekening_pasangan}
                  disabledInput={true}
                />
              </div>
            </div>
          </div>
          <hr className='mb-5 border-gray-300 my-10' />
          <div className='lg:pr-10 flex flex-col mt-8'>
            <div className='-mx-2 md:items-center'>
              <InputComponent title={'Nama Anak'} valueInput={dataPeserta.nama_anak} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'Tanggal Lahir Anak'}
                valueInput={dataPeserta?.tgl_lahir_anak ? formatDate(dataPeserta?.tgl_lahir_anak) : ''}
                disabledInput={true}
              />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No Telp Anak'} valueInput={dataPeserta.no_telp_anak} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No KTP Anak'} valueInput={dataPeserta.no_ktp_anak} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center mt-3'>
              <InputComponent title={'No BPJS Anak'} valueInput={dataPeserta.no_bpjs_anak} disabledInput={true} />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Nama Bank Anak'} valueInput={dataPeserta.nama_bank_anak} disabledInput={true} />
              </div>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'No Rekening Anak'}
                  valueInput={dataPeserta.no_rekening_anak}
                  disabledInput={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPendukung;
