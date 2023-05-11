import React from 'react';
import Image from 'next/image';
import {RiCloseCircleFill} from 'react-icons/ri';

export default function Modal({onShow, onHide, picture, desc}) {
  return (
    <>
      {onShow ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='absolute  -right-2 -top-2'>
                  <RiCloseCircleFill color='red' size='30' onClick={onHide} />
                </div>

                {desc ? (
                  <div className='relative p-6 flex-auto'>
                    <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                      I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts-
                      their perception of themselves! They're slowed down by their perception of themselves. If you're
                      taught you can’t do anything, you won’t do anything. I was taught I could do everything.
                    </p>
                  </div>
                ) : (
                  <Image src={picture} width={500} height={500} alt='pop up' />
                )}
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
