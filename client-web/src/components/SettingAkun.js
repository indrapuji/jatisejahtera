import React, {useState} from 'react';
import InputComponent from './InputComponent';
import newAlert from './newAlert';
import {useRouter} from 'next/router';
import axios from 'axios';

function SettingAkun({profileData}) {
  const router = useRouter();
  const [userPassword, setUserPassword] = useState(true);
  const [resetpass, setResetPass] = useState(false);
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
  });
  const [validate, setValidate] = useState('');

  const setShow = () => {
    setUserPassword(!userPassword);
  };

  const onFormChange = (e) => {
    const {value, name} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, validate);
    try {
      e.preventDefault();
      const {old_password, new_password} = formData;
      if (old_password === '' || new_password === '' || validate === '') {
        newAlert({status: 'error', message: 'Isi Semua Form'});
        return;
      }

      if (new_password !== validate) {
        newAlert({status: 'error', message: 'password tidak sama'});
        return;
      }

      await axios({
        method: 'PUT',
        url: `${process.env.API_URL}/user/update-password`,
        data: formData,
        headers: {
          token: localStorage.token,
        },
      });
      newAlert({status: 'success', message: 'Password berhasil diganti'});
      localStorage.removeItem('token');
      router.push('/');
    } catch (err) {
      console.log(err);
      newAlert({status: 'error', message: err.response.data.msg});
    }
  };

  return (
    <div className='col-span-2 w-full px-8 py-4 mt-10 bg-white rounded-lg shadow-md dark:bg-gray-800 lg:my-12 '>
      <div className='max-w-xl md:mx-auto text-center sm:text-center lg:max-w-2xl'>
        <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
          Setting Profile
        </h2>
      </div>
      {resetpass ? (
        <form onSubmit={onFormSubmit}>
          <div className='lg:pr-10 flex flex-col'>
            <div className='-mx-2 md:items-center md:flex'>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Password lama</label>
                <input
                  type='text'
                  name='old_password'
                  value={formData.old_password}
                  placeholder='John Doe'
                  className='bg-white block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  onChange={onFormChange}
                />
              </div>
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Password baru</label>
                <input
                  type='text'
                  name='new_password'
                  value={formData.new_password}
                  placeholder='John Doe'
                  className='bg-white block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  onChange={onFormChange}
                />
              </div>
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <div className='flex-1 px-2'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Ulangi Password baru</label>
                <input
                  type='text'
                  name='validate'
                  placeholder='John Doe'
                  className='bg-white block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  onChange={(e) => setValidate(e.target.value)}
                />
              </div>
            </div>
            <div className='-mx-2 md:items-center md:flex mt-8 px-2'>
              <button
                className='w-full px-4 py-1.5 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                type='submit'
              >
                Ganti Password
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className='lg:pr-10 flex flex-col mb-4'>
          <div className='lg:grid lg:gap-10 lg:grid-cols-2'>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Username'} value={profileData.username} disabledInput={true} />
            </div>
            <div className='-mx-2 md:items-center md:flex mt-3'>
              <InputComponent title={'Nomor Induk'} value={profileData.nip} disabledInput={true} />
            </div>
          </div>

          <div className='lg:grid lg:gap-10 lg:grid-cols-3 mt-3'>
            <div className='col-span-2 md:items-center md:flex mt-3'>
              <div className='flex-1'>
                <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Password</label>
                <div className='relative'>
                  <input
                    type={userPassword ? 'password' : 'text'}
                    name='nama'
                    placeholder='John Doe'
                    value={profileData.password}
                    className='bg-white block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                  <div
                    className='absolute right-0 bottom-1.5 focus:outline-none cursor-pointer'
                    onClick={() => setShow()}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 mt-2'
                    >
                      <path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
                      <path
                        fillRule='evenodd'
                        d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className='-mx-2 md:items-center md:flex mt-10 '>
              <button
                className='w-full px-4 py-1.5 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                onClick={() => setResetPass(true)}
              >
                Ganti Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingAkun;
