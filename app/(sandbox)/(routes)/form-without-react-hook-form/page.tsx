'use client';

import { useState } from 'react';

const FormWithoutReactHookFormPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <form className='flex flex-col gap-y-2'>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
        className='rounded px-4 py-2'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        placeholder='Password'
        className='rounded px-4 py-2'
      />
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type='password'
        placeholder='Confirm password'
        className='rounded px-4 py-2'
      />
      <button
        type='submit'
        className='rounded bg-green-500 py-2 text-lg font-medium text-white disabled:bg-gray-500'>
        Submit
      </button>
    </form>
  );
};

export default FormWithoutReactHookFormPage;
