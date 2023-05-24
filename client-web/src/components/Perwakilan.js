import React from 'react';

function Perwakilan() {
  const dataCabang = [
    {
      nama: 'KANTOR PERWAKILAN YKP3.JS JAWA BARAT',
      cabang: 'D/A KANTOR PERUM PERHUTANI',
      alamat: 'JL.SOEKARNO HATTA NO. 628 KM.14 BANDUNG 40292',
      tlp: 'TLP. 62.22. 7802792',
    },
    {
      nama: 'KANTOR PERWAKILAN YKP3.JS JAWA TENGAH',
      cabang: 'D/A KANTOR PERUM PERHUTANI',
      alamat: 'JL.PAHLAWAN NO. 15 - 17 SEMARANG 50243',
      tlp: 'TLP. 62.24 8413631',
    },
    {
      nama: 'KANTOR PERWAKILAN YKP3.JS JAWA TIMUR',
      cabang: 'D/A GRAHA PERHUTANI',
      alamat: 'JL.GENTENG KALI NO. 49 SURABAYA 60008',
      tlp: 'TLP. 62.31 5343881',
    },
  ];

  return (
    <div className='bg-white dark:bg-gray-900'>
      <div className='container px-6 py-8 mx-auto'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {dataCabang.map((item, index) => (
            <div key={index}>
              <h1 className='mt-4 text-l font-semibold text-gray-800 dark:text-white'>{item.nama}</h1>
              <p className='mt-2 text-gray-500 dark:text-gray-400 text-sm'>{item.cabang}</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>{item.alamat}</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>{item.tlp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Perwakilan;
