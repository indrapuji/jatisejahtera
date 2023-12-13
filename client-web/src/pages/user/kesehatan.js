import React, {useState, useEffect} from 'react'
import Layout from '@components/Layout'
import Navigation from '@components/Navigation'
import Footer from '@components/Footer'
import newAlert from '@components/newAlert'
import {useRouter} from 'next/router'
import axios from 'axios'
import activeButton from '@utilities/activeButton'
import showButton from '@utilities/showButton'

function Kesehatan() {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.token) {
      newAlert({status: 'error', message: 'Anda belum login'})
      router.push('/')
    } else {
      if (localStorage.status === 'false') {
        newAlert({status: 'error', message: 'Anda belum update data anda'})
        router.push('/user/update')
      } else {
        newAlert({status: 'info', message: 'Maksimal pertanggungan 15 tahun setelah pensiun'})
      }
    }
  }, [])

  const [formData, setFormData] = useState({
    surat_permohonan_bantuan_biaya: '',
    kuitansi_asli_rs: '',
    surat_keterangan_rs: '',
    fotokopi_sk_pensiun: '',
    fotokopi_kp: '',
    foto_selfie: '',
    all_in_one: ''
  })

  const [loading, setLoading] = useState(false)

  const topBarKlaim = [
    {
      title: 'Kacamata',
      class: showButton.false,
      click: () => router.push('/user/kacamata')
    },
    {
      title: 'Kematian',
      class: showButton.false,
      click: () => router.push('/user/kematian')
    },
    {
      title: 'Rawat Inap',
      class: showButton.true,
      click: () => router.push('/user/kesehatan')
    },
    {
      title: 'Nilai Hidup',
      class: showButton.false,
      click: () => router.push('/user/manfaat')
    }
  ]

  const sideBarText = [
    {
      title: 'Bantuan Kacamata',
      class: activeButton.false,
      click: () => router.push('/user/kacamata')
    },
    {
      title: 'Santunan Kematian',
      class: activeButton.false,
      click: () => router.push('/user/kematian')
    },
    {
      title: 'Bantuan Rawat Inap',
      class: activeButton.true,
      click: () => router.push('/user/kesehatan')
    },
    {
      title: 'Manfaat Nilai Hidup',
      class: activeButton.false,
      click: () => router.push('/user/manfaat')
    }
  ]

  const onFormChange = (e) => {
    e.preventDefault()
    const {name, files} = e.target
    setFormData({
      ...formData,
      [name]: files[0]
    })
  }

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const newFormData = new FormData()
      for (let keys in formData) {
        newFormData.append(`${keys}`, formData[keys])
      }
      await axios({
        method: 'POST',
        url: `${process.env.API_URL}/claim/kesehatan/${localStorage.username}`,
        data: newFormData,
        headers: {
          token: localStorage.token
        }
      })
      newAlert({status: 'success', message: 'Claim berhasil diajukan'})
      router.push('/')
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
      <div className='bg-white shadow dark:bg-gray-800 lg:hidden'>
        <div className='container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300'>
          {topBarKlaim.map((item, index) => (
            <div key={index} className={item.class} onClick={item.click}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10'>
        {/* <div className='relative pb-20'>
          <img
            className='object-cover w-full h-56 rounded-lg shadow-lg sm:h-96'
            src={'https://i.ibb.co/p0QFFqs/car-1.jpg'}
            alt='nature'
          />
        </div> */}

        <div className='grid gap-10 lg:grid-cols-3 '>
          {/* side card */}
          <div className='w-full px-8 py-4 mt-10 bg-white rounded-lg dark:bg-gray-800 lg:my-12 hidden lg:block'>
            {sideBarText.map((item, index) => (
              <div key={index}>
                <button type='button' className={item.class} onClick={item.click}>
                  {item.title}
                </button>
              </div>
            ))}
          </div>
          <div className='col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
            <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
              <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
                Bantuan Rawat Inap
              </h2>
            </div>
            <form onSubmit={onFormSubmit}>
              <div>
                <label className='block text-sm text-gray-500 dark:text-gray-300'>
                  Surat permohonan bantuan biaya rawat inap dari pensiunan
                </label>
                <input
                  type='file'
                  className='block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300'
                  name='surat_permohonan_bantuan_biaya'
                  onChange={onFormChange}
                />
              </div>
              <div className='mt-6'>
                <label className='block text-sm text-gray-500 dark:text-gray-300'>
                  Kuitansi asli dari Rumah Sakit pensiunan di rawat
                </label>
                <input
                  type='file'
                  className='block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300'
                  name='kuitansi_asli_rs'
                  onChange={onFormChange}
                />
              </div>
              <div className='mt-6'>
                <label className='block text-sm text-gray-500 dark:text-gray-300'>
                  Surat keterangan sakit yang di tanda tangani oleh rumah sakit
                </label>
                <input
                  type='file'
                  className='block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300'
                  name='surat_keterangan_rs'
                  onChange={onFormChange}
                />
              </div>

              <div className='mt-6'>
                <label className='block text-sm text-gray-500 dark:text-gray-300'>Photo Copy SK Pensiun</label>
                <input
                  type='file'
                  className='block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300'
                  name='fotokopi_sk_pensiun'
                  onChange={onFormChange}
                />
              </div>
              <div className='mt-6'>
                <label className='block text-sm text-gray-500 dark:text-gray-300'>Photo Copy kartu peserta</label>
                <input
                  type='file'
                  className='block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300'
                  name='fotokopi_kp'
                  onChange={onFormChange}
                />
              </div>
              <div className='mt-6'>
                <label className='block text-sm text-gray-500 dark:text-gray-300'>
                  Foto selfie dangan memegang KTP
                </label>
                <input
                  type='file'
                  className='block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300'
                  name='foto_selfie'
                  onChange={onFormChange}
                />
              </div>
              <div className='mt-6'>
                <label className='block text-sm text-green-600 dark:text-green-600'>All in One</label>
                <input
                  type='file'
                  className='block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-green-600 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300'
                  name='all_in_one'
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

                  <span className='mx-1'>Kirim</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

export default Kesehatan
