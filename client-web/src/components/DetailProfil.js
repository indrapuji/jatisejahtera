import React, {useState, useEffect} from 'react'
import formatDate from '@utilities/FormatDate'
import InputComponent from './InputComponent'
import newAlert from './newAlert'
import axios from 'axios'
import {useRouter} from 'next/router'

function DetailProfil({profileData, dataPeserta}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    no_telp: dataPeserta?.no_telp,
    tgl_lahir: dataPeserta?.tgl_lahir,
    no_ktp: dataPeserta?.no_ktp,
    no_bpjs: dataPeserta?.no_bpjs,
    nama_bank: dataPeserta?.nama_bank,
    no_rekening: dataPeserta?.no_rekening,
    alamat: dataPeserta?.alamat,
    kelurahan: dataPeserta?.kelurahan,
    kecamatan: dataPeserta?.kecamatan,
    kota: dataPeserta?.kota,
    kodepos: dataPeserta?.kodepos,
    provinsi: dataPeserta?.provinsi
  })

  useEffect(() => {
    setFormData({
      ...formData,
      no_telp: dataPeserta?.no_telp,
      tgl_lahir: dataPeserta?.tgl_lahir,
      no_ktp: dataPeserta?.no_ktp,
      no_bpjs: dataPeserta?.no_bpjs,
      nama_bank: dataPeserta?.nama_bank,
      no_rekening: dataPeserta?.no_rekening,
      alamat: dataPeserta?.alamat,
      kelurahan: dataPeserta?.kelurahan,
      kecamatan: dataPeserta?.kecamatan,
      kota: dataPeserta?.kota,
      kodepos: dataPeserta?.kodepos,
      provinsi: dataPeserta?.provinsi
    })
  }, [dataPeserta])

  const onFormChange = (e) => {
    e.preventDefault()
    const {value, name} = e.target
    console.log(value)
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)

      await axios({
        method: 'PUT',
        url: `${process.env.API_URL}/data/update-record/${dataPeserta?.id}`,
        data: formData,
        headers: {
          token: localStorage.token
        }
      })
      newAlert({status: 'success', message: 'Update Data Berhasil'})
      router.push('/user')
      setLoading(false)
    } catch (err) {
      console.log(err)
      // newAlert({status: 'error', message: err.response.data.msg})
      newAlert({status: 'error', message: 'Gagal Update Data'})
      setLoading(false)
    }
  }
  return (
    <div className='col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
      <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
        <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
          Detail Profile
        </h2>
      </div>
      <div className='lg:pr-10 flex flex-col'>
        <form onSubmit={onFormSubmit}>
          <div className='-mx-2 md:items-center md:flex'>
            <InputComponent title={'Nama'} value={profileData?.name} disabledInput={true} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Nomor Induk'} value={profileData?.nip} disabledInput={true} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'Email'} value={profileData?.email} disabledInput={true} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent title={'No Telp'} value={formData.no_telp} name='no_telp' onChange={onFormChange} />
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <InputComponent
              title={'Tanggal Lahir'}
              value={formData.tgl_lahir}
              type='date'
              name='tgl_lahir'
              onChange={onFormChange}
            />
          </div>
          <div className='-mx-2 md:items-center mt-3'>
            <InputComponent title={'No KTP'} value={formData.no_ktp} name='no_ktp' onChange={onFormChange} />
          </div>
          <div className='-mx-2 md:items-center mt-3'>
            <InputComponent title={'No BPJS'} value={formData.no_bpjs} name='no_bpjs' onChange={onFormChange} />
          </div>
          <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Nama Bank'} value={formData.nama_bank} name='nama_bank' onChange={onFormChange} />
            </div>
            <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'No Rekening'}
                name='no_rekening'
                value={formData.no_rekening}
                placeholder='no rekening'
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Satuan Kerja'} value={dataPeserta?.satuan_kerja} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'KPH'} value={dataPeserta?.cabang} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Golongan'} value={dataPeserta?.golongan_pangkat} disabledInput={true} />
            </div>
          </div>
          <div className='-mx-2 md:items-center md:flex mt-3'>
            <div className='flex-1 px-2'>
              <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Alamat</label>
              <textarea
                rows='4'
                placeholder='Alamat...'
                value={dataPeserta && formData.alamat}
                className={`bg-white-200 block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                name='alamat'
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className='lg:grid lg:gap-10 lg:grid-cols-2'>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Kecamatan'} value={formData.kecamatan} name='kecamatan' onChange={onFormChange} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'Kelurahan'}
                value={formData.kelurahan}
                placeholder='kelurahan'
                name='kelurahan'
                onChange={onFormChange}
              />
            </div>
          </div>
          <div className='lg:grid lg:gap-10 lg:grid-cols-3 mb-10'>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Kota'} value={formData.kota} name='kota' onChange={onFormChange} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Kodepos'} value={formData.kodepos} name='kodepos' onChange={onFormChange} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'Provinsi'}
                value={formData.provinsi}
                placeholder='provinsi'
                name='provinsi'
                onChange={onFormChange}
              />
            </div>
            <div className='mt-6'>
              <button
                className='flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80'
                type='submit'
              >
                {loading && (
                  <svg
                    aria-hidden='true'
                    className='inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                )}

                <span className='mx-1'>Update</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DetailProfil
