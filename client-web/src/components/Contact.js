import React, {useState} from 'react';
import axios from 'axios';

import newAlert from './newAlert';

function Contact() {
  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    telp: '',
    email: '',
    pesan: '',
  });

  const onFormChange = (event) => {
    const {name, value} = event.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const {nama, alamat, telp, email, pesan} = formData;
      if (!nama || !alamat || !telp || !email || !pesan) {
        newAlert({status: 'error', message: 'Isi semua form'});
        return;
      }
      await axios({
        method: 'POST',
        url: `${process.env.API_URL}/contact/add`,
        data: formData,
      });
      newAlert({status: 'success', message: 'Pesan terkirim'});
      setFormData({...formData, nama: '', alamat: '', telp: '', email: '', pesan: ''});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className='min-h-screen bg-cover '
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'`,
      }}
    >
      <div className='flex flex-col min-h-screen bg-black/60'>
        <div className='container flex flex-col flex-1 px-6 py-12 mx-auto'>
          <div className='flex-1 lg:flex lg:items-center lg:-mx-6'>
            <div className='text-white lg:w-1/2 lg:mx-6'></div>

            <div className='mt-8 lg:w-1/2 lg:mx-6'>
              <div className='w-full px-8 py-10 mx-auto overflow-hidden bg-white shadow-2xl rounded-xl dark:bg-gray-900 lg:max-w-xl'>
                <h1 className='text-xl font-medium text-gray-700 dark:text-gray-200'>Hubungi Kami</h1>

                <p className='mt-2 text-gray-500 dark:text-gray-400'>
                  Memiliki seputar pertanyaan atau informasi lainnya?
                </p>

                <form className='mt-6' onSubmit={onFormSubmit}>
                  <div className='flex-1'>
                    <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Nama</label>
                    <input
                      type='text'
                      name='nama'
                      value={formData.nama}
                      placeholder='John Doe'
                      className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      onChange={onFormChange}
                    />
                  </div>
                  <div className='flex-1 mt-6'>
                    <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Alamat</label>
                    <input
                      type='text'
                      name='alamat'
                      value={formData.alamat}
                      placeholder='Wisma Perhutani'
                      className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      onChange={onFormChange}
                    />
                  </div>
                  <div className='flex-1 mt-6'>
                    <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Telp</label>
                    <input
                      type='text'
                      name='telp'
                      value={formData.telp}
                      placeholder='081211111111'
                      className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      onChange={onFormChange}
                    />
                  </div>

                  <div className='flex-1 mt-6'>
                    <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Email address</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      placeholder='johndoe@example.com'
                      className='block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      onChange={onFormChange}
                    />
                  </div>

                  <div className='w-full mt-6'>
                    <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>Pesan</label>
                    <textarea
                      name='pesan'
                      value={formData.pesan}
                      className='block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
                      placeholder='Message'
                      onChange={onFormChange}
                    />
                  </div>

                  <button
                    className='w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
                    type='submit'
                  >
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
