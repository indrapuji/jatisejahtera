import React, {useEffect, useState} from 'react';
import {RiCloseCircleFill} from 'react-icons/ri';
import {useRouter} from 'next/router';

function UpdateNotif() {
  const router = useRouter();
  const [notifOff, setNotifOff] = useState();
  useEffect(() => {
    if (localStorage.token) {
      setNotifOff(localStorage.status === 'false' ? false : true);
    } else {
      setNotifOff(true);
    }
  }, []);
  const notification = () => {
    setNotifOff(true);
  };

  const redirectTo = () => {
    router.push('user/update');
  };
  return (
    <>
      {!notifOff && (
        <div className='relative bg-yellow-100 px-4 py-3 text-white md:block'>
          <p className='text-center text-sm text-red-500 font-medium cursor-pointer' onClick={() => redirectTo()}>
            Segera lakukan update data
          </p>
          <div className='absolute  right-0 -bottom-4'>
            <RiCloseCircleFill color='red' size='30' onClick={() => notification()} />
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateNotif;
