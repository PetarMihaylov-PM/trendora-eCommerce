import React, { useState } from 'react';
import { toast } from 'react-toastify';

function NewsLetterBox() {

  const [subscribeInput, setSubscribeInput] = useState('');

  function onSubmitHandler(e) {
    e.preventDefault();
    setSubscribeInput('');
    toast.success('You are now subscribed!');
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscibe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Don't miss out - be the first to know about our latest updates and promotions!
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border-1 border-gray-300 rounded-sm'>
        <input onChange={(e) => setSubscribeInput(e.target.value)} className='w-full sm:flex-1 outline-none px-1' type="email" placeholder='Enter your email' value={subscribeInput} required/>
        <button className='bg-[#ffab34] text-white text-base px-10 py-3 rounded-sm cursor-pointer hover:opacity-80' type='submit'>
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsLetterBox