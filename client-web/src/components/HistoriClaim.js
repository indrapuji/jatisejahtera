import React from 'react';
import formatDate from '@utilities/FormatDate';

function HistoriClaim({data}) {
  console.log(data);

  const claimCategory = (name) => {
    if (name === 'claim-kematian') {
      return 'Santunan Kematian';
    } else if (name === 'claim-manfaat') {
      return 'Manfaat Nilai Hidup';
    } else if (name === 'claim-kesehatan') {
      return 'Bantuan Rawat Inap';
    } else {
      return 'Bantuan Kacamata';
    }
  };

  const statusCLaim = (stat) => {
    if (stat === 'created') {
      return 'Pengajuan';
    } else if (stat === 'approve') {
      return 'Disetujui';
    } else {
      return 'Ditolak';
    }
  };

  return (
    <div className='overflow-x-auto col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
      {data.length > 0 ? (
        <div>
          <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
            <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
              Histori Pengajuan Klaim
            </h2>
          </div>

          {data && (
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hover:bg-stone-100'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Jenis Klaim
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Tanggal Pengajuan
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Tanggal Status
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Status Klaim
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Pemohon
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Lampiran
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Nominal
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item) => (
                      <tr
                        key={item.id}
                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-stone-100'
                      >
                        <td
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:bg-stone-100'
                        >
                          {claimCategory(item.kategori)}
                        </td>
                        <td className='px-6 py-4'>{item.created_date ? formatDate(item.created_date) : ''}</td>
                        <td className='px-6 py-4'>{item.updated_date ? formatDate(item.updated_date) : ''}</td>

                        <td className='px-6 py-4'>{statusCLaim(item.status)}</td>
                        <td className='px-6 py-4'>{item.pemohon}</td>
                        {item.lampiran ? (
                          <td className='px-6 py-4 text-center'>
                            <a
                              href={item.lampiran}
                              target='_blank'
                              className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                            >
                              lihat
                            </a>
                          </td>
                        ) : (
                          <td className='px-6 py-4'></td>
                        )}

                        <td className='px-6 py-4'>{item.nominal}</td>
                        <td className='px-6 py-4'>{item.pesan}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
            Anda belum pernah mengajukan Klaim
          </h2>
        </div>
      )}
    </div>
  );
}

export default HistoriClaim;
