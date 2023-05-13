import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {decrypt} from '@utilities/RandomLink';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import axios from 'axios';
import newAlert from '@components/newAlert';

function Register() {
  const router = useRouter();
  const {id} = router.query;

  const [formData, setFormData] = useState({
    name: '',
    nip: '',
    email: '',
    username: '',
    password: '',
    regional: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataPeserta();
  }, []);

  const getDataPeserta = async () => {
    try {
      const {data} = await axios({
        method: 'POST',
        url: `https://ws.ykp3js.org/cek`,
        data: {
          nip: decrypt(id),
          tokenkey:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJZS1AzSlNXZWIiLCJ0aW1lc3RhbXAiOjE2NjIyNzM1MDB9.7W1lr29HTvAQDYR1FUIRG3mrsyGqTVAbQe9daDeUz8k',
          act: 'klaim',
        },
      });
      setFormData({...formData, name: data.data.Nama, nip: data.data.NIP});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFormChange = (e) => {
    e.preventDefault();
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      setLoading(true);
      const {name, nip, email, username, password, regional} = formData;
      if (name === '' || nip === '' || email === '' || username === '' || password === '' || regional === '') {
        newAlert({status: 'error', message: 'Isi Semua Form'});
        return;
      }
      await axios({
        method: 'POST',
        url: process.env.API_URL + '/user/register',
        data: formData,
      });
      setLoading(false);
      newAlert({status: 'success', message: 'Berhasil'});
      router.push('/');
    } catch (error) {
      console.log(error);
      const {msg} = error.response.data;
      newAlert({status: 'error', message: msg});
      setLoading(false);
    }
  };

  return (
    <Layout pageTitle={'REGISTER || JATISEJAHTERA'}>
      <Navigation />
      <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
          <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
            Register Peserta
          </h2>
        </div>
        <div className='col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
          <form onSubmit={onFormSubmit}>
            <div className='lg:grid lg:gap-10 lg:grid-cols-2'>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Nama</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  disabled
                  className='bg-gray-200
                block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>NIP</label>
                <input
                  type='text'
                  name='nip'
                  value={formData.nip}
                  disabled
                  className='bg-gray-200
                block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-2 mt-3'>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Email</label>
                <input
                  type='text'
                  name='email'
                  value={formData.email}
                  className='bg-white
                block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  onChange={onFormChange}
                />
              </div>
              <div className='flex-1 px-2'>
                <label class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Regional</label>
                <select
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  name='regional'
                  value={formData.regional}
                  onChange={onFormChange}
                >
                  <option value=''>Pilih Regional</option>
                  <option value='kantor-pusat'>Kantor Pusat</option>
                  <option value='jawa-barat'>Jawa Barat dan Banten</option>
                  <option value='jawa-tengah'>Jawa Tengah</option>
                  <option value='jawa-timur'>Jawa Timur</option>
                </select>
              </div>
            </div>
            <div className='lg:grid lg:gap-10 lg:grid-cols-2 mt-3'>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Username</label>
                <input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={onFormChange}
                  className='bg-white
                block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                />
              </div>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Password</label>
                <input
                  type='text'
                  name='password'
                  value={formData.password}
                  onChange={onFormChange}
                  className='bg-white
                block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
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

                <span className='mx-1'>Daftar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Register;
