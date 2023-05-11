import React from 'react';

function InputComponent({title, valueInput, disabledInput, name, onChange}) {
  return (
    <div className='flex-1 px-2'>
      <label className='block mb-2 text-sm text-gray-600 dark:text-gray-200'>{title}</label>
      <input
        type='text'
        name={name}
        value={valueInput}
        placeholder='John Doe'
        disabled={disabledInput}
        className={`${
          disabledInput ? 'bg-gray-200' : 'bg-white'
        } block w-full px-5 py-1.5 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
        onChange={onChange}
      />
    </div>
  );
}

export default InputComponent;
