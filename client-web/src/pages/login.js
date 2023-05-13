import React, {useState} from 'react';
import Layout from '@components/Layout';
import Logo from '@assets/images/logo.png';
import Image from 'next/image';
import axios from 'axios';
import newAlert from '@components/newAlert';
import {useRouter} from 'next/router';
import Swal from 'sweetalert2';
import {encrypt} from '@utilities/RandomLink';

function login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [pass, setPass] = useState('password');

  const onFormChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const {username, password} = formData;
      if (!username || !password) {
        newAlert({status: 'error', message: 'Isi semua form'});
        return;
      }
      const {data} = await axios({
        method: 'POST',
        url: `${process.env.API_URL}/user/login`,
        data: formData,
      });
      console.log(data);
      if (data.role === 'member') {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username);
        newAlert({status: 'success', message: `Selamat datang ${data.name}`});
        router.push('/');
      } else {
        newAlert({status: 'error', message: `Anda tidak diizinkan untuk mengakses halaman ini`});
      }
      console.log(data);
    } catch (error) {
      newAlert({status: 'error', message: error.response.data.msg});
      console.log(error);
    }
  };

  const setShow = () => {
    if (pass === 'password') {
      setPass('text');
    } else {
      setPass('password');
    }
  };

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
        router.push(`/register/${encrypt(dataNIP)}`);
      } else {
        newAlert({status: 'error', message: 'NIP tidak terdaftar / NIP salah'});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle={'LOGIN || JATISEJAHTERA'}>
      <div className='bg-white dark:bg-gray-900'>
        <div className='flex justify-center h-screen'>
          <div
            className='hidden bg-cover lg:block lg:w-2/3'
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
            }}
          >
            <div className='flex items-center h-full px-20 bg-gray-900 bg-opacity-40'>
              <div>
                <h2 className='text-2xl font-bold text-white sm:text-3xl'>
                  Yayasan Kesejahteraan Pegawai Perum Perhutani
                </h2>
              </div>
            </div>
          </div>

          <div className='flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6'>
            <div className='flex-1'>
              <div className='text-center'>
                <div className='flex justify-center mx-auto'>
                  <Image className='w-auto h-7 sm:h-8' src={Logo} alt='logo' />
                </div>

                <p className='mt-3 text-gray-500 dark:text-gray-300'>Sign in to access your account</p>
              </div>

              <div className='mt-8'>
                <form onSubmit={onFormSubmit}>
                  <div>
                    <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Username</label>
                    <input
                      type='text'
                      name='username'
                      placeholder='johndoe'
                      className='block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      onChange={onFormChange}
                    />
                  </div>

                  <div className='mt-6'>
                    <div className='flex justify-between mb-2'>
                      <label className='text-sm text-gray-600 dark:text-gray-200'>Password</label>
                    </div>

                    <div className='relative flex items-center mt-2'>
                      <div
                        className='absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto cursor-pointer'
                        onClick={() => setShow()}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400'
                        >
                          <path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
                          <path
                            fillRule='evenodd'
                            d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </div>

                      <input
                        type={pass}
                        placeholder='********'
                        name='password'
                        onChange={onFormChange}
                        className='block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                      />
                    </div>
                  </div>

                  <div className='mt-6'>
                    <button className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'>
                      Sign in
                    </button>
                  </div>
                </form>

                <p className='mt-6 text-sm text-center text-gray-400'>
                  Belum punya akun?{' '}
                  <a
                    className='text-blue-500 focus:outline-none focus:underline hover:underline'
                    onClick={() => handleAdd()}
                  >
                    Daftar
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default login;
