import React, {useState, useEffect} from 'react'
import Layout from '@components/Layout'
import Navigation from '@components/Navigation'
import Footer from '@components/Footer'
import newAlert from '@components/newAlert'
import {useRouter} from 'next/router'
import axios from 'axios'
import InputComponent from '@components/InputComponent'
import getAge from '@utilities/getAge'
import JABAR from '@utilities/jabarSection'
import KAPUS from '@utilities/kapusSection'
import JATENG from '@utilities/jatengSection'
import JATIM from '@utilities/jatimSection'

function Update() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState()
  const [formData, setFormData] = useState({
    tgl_lahir: '',
    no_ktp: '',
    no_bpjs: '',
    nama_bank: '',
    no_rekening: '',
    satuan_kerja: '',
    cabang: '',
    golongan_pangkat: '',
    no_telp: '',
    alamat: '',
    kelurahan: '',
    kecamatan: '',
    kota: '',
    kodepos: '',
    provinsi: '',
    nama_pasangan: '',
    tgl_lahir_pasangan: '',
    no_telp_pasangan: '',
    no_ktp_pasangan: '',
    no_bpjs_pasangan: '',
    nama_bank_pasangan: '',
    no_rekening_pasangan: '',
    nama_anak: '',
    tgl_lahir_anak: '',
    no_tlp_anak: '',
    no_ktp_anak: '',
    no_bpjs_anak: '',
    nama_bank_anak: '',
    no_rekening_anak: ''
  })

  const [umurPeserta, setUmurPeserta] = useState('')
  const [umurPasangan, setUmurPasangan] = useState('')
  const [umurAnak, setUmurAnak] = useState('')

  useEffect(() => {
    if (!localStorage.token) {
      newAlert({status: 'error', message: 'Anda belum login'})
      router.push('/login')
    } else {
      getProfile()
    }
  }, [])

  const getProfile = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/user/profile`,
        headers: {
          token: localStorage.token
        }
      })
      console.log(data)
      setFormData({...formData, satuan_kerja: data.regional})
      setProfileData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const onFormChange = (e) => {
    e.preventDefault()
    const {name, value} = e.target
    if (name === 'tgl_lahir') {
      setFormData({
        ...formData,
        [name]: value
      })
      setUmurPeserta(getAge(value))
    } else if (name === 'tgl_lahir_pasangan') {
      setFormData({
        ...formData,
        [name]: value
      })
      setUmurPasangan(getAge(value))
    } else if (name === 'tgl_lahir_anak') {
      setFormData({
        ...formData,
        [name]: value
      })
      setUmurAnak(getAge(value))
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      await axios({
        method: 'POST',
        url: `${process.env.API_URL}/data/record`,
        data: formData,
        headers: {
          token: localStorage.token
        }
      })
      newAlert({status: 'success', message: 'Update data berhasil'})
      localStorage.setItem('status', 'true')
      router.push('/user')
      setLoading(false)
    } catch (err) {
      console.log(err)
      newAlert({status: 'error', message: err.response.data.msg})
      setLoading(false)
    }
  }
  return (
    <Layout pageTitle={'KLAIM || JATISEJAHTERA'}>
      <Navigation />
      <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 '>
        <div className='relative pb-20'>
          <img
            className='object-cover w-full h-56 rounded-lg shadow-lg sm:h-96'
            src={'https://i.ibb.co/p0QFFqs/car-1.jpg'}
            alt='nature'
          />
        </div>

        <div className='w-full px-8 bg-white rounded-lg shadow-md dark:bg-gray-800 py-5'>
          <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
            <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
              Update data
            </h2>
          </div>

          <form onSubmit={onFormSubmit}>
            <div className='-mx-2 md:items-center md:flex'>
              <InputComponent title={'Nama'} value={profileData?.name} disabledInput={true} onChange={onFormChange} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'NIP/NPP/NIK'}
                value={profileData?.nip}
                disabledInput={true}
                onChange={onFormChange}
              />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Email'} value={profileData?.email} disabledInput={true} onChange={onFormChange} />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Tanggal lahir'}
                  type={'date'}
                  onChange={onFormChange}
                  name='tgl_lahir'
                  value={formData.tgl_lahir}
                />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent name='umur_peserta' title={'Umur'} disabledInput value={umurPeserta} />
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-2'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Nomor KTP'} name='no_ktp' value={formData.no_ktp} onChange={onFormChange} />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Nomor BPJS'} name='no_bpjs' value={formData.no_bpjs} onChange={onFormChange} />
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nama Bank'}
                  name='nama_bank'
                  value={formData.nama_bank}
                  onChange={onFormChange}
                />
              </div>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nomor Rekening'}
                  name='no_rekening'
                  value={formData.no_rekening}
                  onChange={onFormChange}
                />
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-4'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Satuan Kerja'}
                  name='satuan_kerja'
                  onChange={onFormChange}
                  value={formData.satuan_kerja}
                  disabledInput
                />
              </div>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <div className='flex-1 px-2'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>KPH</label>
                  <select
                    className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    name='cabang'
                    value={formData.cabang}
                    onChange={onFormChange}
                  >
                    <option value=''>Pilih KPH</option>
                    {formData?.satuan_kerja === 'kantor-pusat' &&
                      KAPUS.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.labelKey}
                        </option>
                      ))}
                    {formData?.satuan_kerja === 'jawa-barat' &&
                      JABAR.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.labelKey}
                        </option>
                      ))}
                    {formData?.satuan_kerja === 'jawa-tengah' &&
                      JATENG.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.labelKey}
                        </option>
                      ))}
                    {formData?.satuan_kerja === 'jawa-timur' &&
                      JATIM.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.labelKey}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <div className='flex-1 px-2'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Golongan saat pensiun
                  </label>
                  <select
                    className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    name='golongan_pangkat'
                    value={formData.golongan_pangkat}
                    onChange={onFormChange}
                  >
                    <option value=''>Pilih golongan</option>
                    <option value='A / I'>A / I</option>
                    <option value='II'>II</option>
                    <option value='III'>III</option>
                    <option value='IV'>IV</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Nomor Telepon'} name='no_telp' value={formData.no_telp} onChange={onFormChange} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Alamat</label>
                <textarea
                  rows='4'
                  placeholder='Alamat...'
                  className='bg-white-200 block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  name='alamat'
                  value={formData.alamat}
                  onChange={onFormChange}
                />
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-2'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Kecamatan'}
                  name='kecamatan'
                  value={formData.kecamatan}
                  onChange={onFormChange}
                />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Kelurahan'}
                  name='kelurahan'
                  value={formData.kelurahan}
                  onChange={onFormChange}
                />
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Kota / Kabupaten'} name='kota' value={formData.kota} onChange={onFormChange} />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Kodepos'} name='kodepos' value={formData.kodepos} onChange={onFormChange} />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Provinsi'} name='provinsi' value={formData.provinsi} onChange={onFormChange} />
              </div>
            </div>
            <div>
              <p className='mb-4 mt-12 font-sans text-xl font-bold leading-none tracking-tight sm:text-2xl md:mx-auto'>
                Data Pasangan (Suami / Istri)
              </p>
            </div>
            <div className='-mx-2 md:items-center md:flex'>
              <InputComponent
                title={'Nama Istri / Suami'}
                name='nama_pasangan'
                value={formData.nama_pasangan}
                onChange={onFormChange}
              />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Tanggal lahir Istri / Suami'}
                  type={'date'}
                  onChange={onFormChange}
                  name='tgl_lahir_pasangan'
                  value={formData.tgl_lahir_pasangan}
                />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Umur Istri / Suami'} disabledInput value={umurPasangan} />
              </div>
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'Nomor Telepon Istri / Suami'}
                name='no_telp_pasangan'
                value={formData.no_telp_pasangan}
                onChange={onFormChange}
              />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-2'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nomor KTP Istri / Suami'}
                  name='no_ktp_pasangan'
                  value={formData.no_ktp_pasangan}
                  onChange={onFormChange}
                />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nomor BPJS Istri / Suami'}
                  name='no_bpjs_pasangan'
                  value={formData.no_bpjs_pasangan}
                  onChange={onFormChange}
                />
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nama Bank Istri / Suami'}
                  name='nama_bank_pasangan'
                  value={formData.nama_bank_pasangan}
                  onChange={onFormChange}
                />
              </div>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nomor Rekening Istri / Suami'}
                  name='no_rekening_pasangan'
                  value={formData.no_rekening_pasangan}
                  onChange={onFormChange}
                />
              </div>
            </div>
            <div>
              <p className='mb-4 mt-12 font-sans text-xl font-bold leading-none tracking-tight sm:text-2xl md:mx-auto'>
                Data anak yang masih dalam tanggungan
              </p>
            </div>
            <div className='-mx-2 md:items-center md:flex'>
              <InputComponent title={'Nama Anak'} name='nama_anak' value={formData.nama_anak} onChange={onFormChange} />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Tanggal lahir Anak'}
                  type={'date'}
                  onChange={onFormChange}
                  name='tgl_lahir_anak'
                  value={formData.tgl_lahir_anak}
                />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent title={'Umur Anak'} disabledInput value={umurAnak} />
              </div>
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent
                title={'Nomor Telepon Anak'}
                name='no_tlp_anak'
                value={formData.no_tlp_anak}
                onChange={onFormChange}
              />
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-2'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nomor KTP Anak'}
                  name='no_ktp_anak'
                  value={formData.no_ktp_anak}
                  onChange={onFormChange}
                />
              </div>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nomor BPJS Anak'}
                  name='no_bpjs_anak'
                  value={formData.no_bpjs_anak}
                  onChange={onFormChange}
                />
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-3'>
              <div className='-mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nama Bank Anak'}
                  name='nama_bank_anak'
                  value={formData.nama_bank_anak}
                  onChange={onFormChange}
                />
              </div>
              <div className='col-span-2 -mx-2 md:items-center md:flex mt-3'>
                <InputComponent
                  title={'Nomor Rekening Anak'}
                  name='no_rekening_anak'
                  value={formData.no_rekening_anak}
                  onChange={onFormChange}
                />
              </div>
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

                <span className='mx-1'>Kirim</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Update
