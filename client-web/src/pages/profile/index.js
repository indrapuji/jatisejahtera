import React, {useEffect, useState} from 'react'
import Navigation from '@components/Navigation'
import Perwakilan from '@components/Perwakilan'
import Footer from '../../components/Footer'
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'

import Image from 'next/image'
import Layout from '@components/Layout'
import map from '@assets/images/map_ykp3js.png'
import axios from 'axios'
import comproPages from '@utilities/compro'
import leaflet1 from '@assets/leaflet/leaflet1.jpg'
import leaflet2 from '@assets/leaflet/leaflet2.jpg'

export default () => {
  const [dataPengurus, setDataPengurus] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    getPengurus()
  }, [])
  const getPengurus = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${process.env.API_URL}/content?category=struktur&status=true`
      })
      setDataPengurus(data[0].image_url)
      console.log(data[0].image_url)
    } catch (error) {
      console.log(error)
    }
  }

  const next = () => {
    if (page < 19) {
      setPage(page + 1)
    } else {
      setPage(0)
    }
  }

  const prev = () => {
    if (page === 0) {
      setPage(19)
    } else {
      setPage(page - 1)
    }
  }

  return (
    <Layout pageTitle={'PROFILE || JATISEJAHTERA'}>
      <Navigation />
      <div className='flex flex-col justify-between'>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-2 py-12 mx-auto text-center'>
            <h2 className='max-w-3xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white mb-8'>
              Susunan Pembina, Pengawas, dan Pengurus YKP3 Jatisejahtera
            </h2>

            <div className='max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300'>
              <Image src={dataPengurus} width={1500} height={500} alt='struktur' priority={true} />
            </div>
          </div>
        </section>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
            <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
              Kantor YKP3JS
            </h2>

            <div className='max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300'>
              <Image src={map} width={1000} height={500} alt='pop up' priority={true} />
            </div>
          </div>
        </section>
        <div className='px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8'>
          <div className='flex flex-col items-start max-w-screen-sm md:flex-row sm:mx-auto'>
            <div>
              <h1 className='mt-4 text-l font-semibold text-gray-800 dark:text-white'>KANTOR PUSAT</h1>
              <p className='mt-2 text-gray-500 dark:text-gray-400 text-sm'>D/A WISMA PERHUTANI</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>JALAN VILLA NO.1 GATOT SOBROTO</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>KAV. 17 – 18 JAKARTA SELATAN</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>TLP. 62.21.5252983, FAX. 62.21.5252983</p>
              <p className='mt-0 text-gray-500 dark:text-gray-400 text-sm'>yayasanjatisejahtera@yahoo.co.id</p>
            </div>
          </div>
        </div>
        <Perwakilan />
        <div className='mt-12 text-center text-4xl font-bold'>
          <p>Company Profile</p>
        </div>

        <div className='mt-6 flex justify-center items-center'>
          <div className='mr-6' onClick={() => prev()}>
            <FaArrowLeft size='25' />
          </div>
          <Image src={comproPages[page].image} alt='pop up' width='450' height='450' priority={true} />
          <div className='ml-6' onClick={() => next()}>
            <FaArrowRight size='25' />
          </div>
        </div>
        <div className='flex justify-center mt-2 mb-2'>
          {comproPages.map((x) => (
            <div className={`border-solid border-2 mx-1 w-2 border-green-${x.id === page + 1 ? '600' : '50'}`} />
          ))}
        </div>
        <div className='mt-12 text-center text-4xl font-bold'>
          <p>Leaflet</p>
        </div>
        <div className='my-6 flex justify-center items-center space-x-2'>
          <Image src={leaflet1} alt='pop up' width='600' priority={true} />
          <Image src={leaflet2} alt='pop up' width='600' priority={true} />
        </div>
        <Footer />
      </div>
    </Layout>
  )
}
