import Image from 'next/image';
import sideImage from '@assets/ornamen/article-decor.svg';
import {motion} from 'framer-motion';
import {useRouter} from 'next/router';

function News({data}) {
  const router = useRouter();
  const intoVarian = {
    hide: {
      opacity: 0,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 2,
      },
      scale: 1,
    },
  };
  return (
    <motion.div className='bg-slate-100 relative' initial='hide' whileInView='show' exit='hide' variants={intoVarian}>
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
        <div className='absolute top-10 -left-24 -scale-50 origin-bottom -rotate-12'>
          <Image src={sideImage} alt='' />
        </div>
        <div className='absolute -top-10 scale-75 right-36'>
          <Image src={sideImage} alt='' />
        </div>
        <div className=''>
          <div className='max-w-xl md:mx-auto sm:text-center lg:max-w-2xl px-5'>
            <h2 className='max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto'>
              <span className='relative inline-block'>
                <svg
                  viewBox='0 0 52 24'
                  fill='currentColor'
                  className='absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block'
                >
                  <defs>
                    <pattern id='2feffae2-9edf-414e-ab8c-f0e6396a0fc1' x='0' y='0' width='.135' height='.30'>
                      <circle cx='1' cy='1' r='.7' />
                    </pattern>
                  </defs>
                  <rect fill='url(#2feffae2-9edf-414e-ab8c-f0e6396a0fc1)' width='52' height='24' />
                </svg>
                <span className='relative'>Berita</span>
              </span>
            </h2>
            <p className='inline-block py-px text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400'>
              Seputar Informasi Yayasan JATISEJAHTERA
            </p>
          </div>
        </div>

        <div className='text-gray-600 body-font'>
          <div className='container px-5 py-12 mx-auto'>
            <div className='flex flex-wrap -m-4'>
              {data &&
                data.map((item) => (
                  <div className='p-4 md:w-1/3 z-10' key={item.id}>
                    <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
                      <img
                        className='lg:h-48 md:h-36 w-full object-cover object-center'
                        src={item.image_url}
                        alt='blog'
                      />
                      <div className='p-6'>
                        <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                          INFORMASI YAYASAN
                        </h2>
                        <h1 className='title-font text-lg font-medium text-gray-900 mb-3 line-clamp-2'>{item.title}</h1>
                        <p className='leading-relaxed mb-3 line-clamp-3'>{item.desc}</p>
                        {/* <div className='flex items-center flex-wrap '>
                          <a className='text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer'>
                            Baca Selengkapnya
                            <svg
                              className='w-4 h-4 ml-2'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth='2'
                              fill='none'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <path d='M5 12h14'></path>
                              <path d='M12 5l7 7-7 7'></path>
                            </svg>
                          </a>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className='container px-5'>
          <div className='lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto'>
            <h1 className='flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900'>
              Informasi Yayasan Selengkapnya
            </h1>
            <button
              onClick={() => router.push('/news')}
              className='flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0'
            >
              Lanjut...
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default News;
