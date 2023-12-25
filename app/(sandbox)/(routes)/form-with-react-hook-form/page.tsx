'use client';

import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

const FormWithReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    getValues,
  } = useForm();

  return (
    <form className='flex flex-col gap-y-2'>
      <input
        type='email'
        required
        placeholder='Email'
        className='rounded px-4 py-2'
      />
      <input
        required
        minLength={6}
        type='password'
        placeholder='Password'
        className='rounded px-4 py-2'
      />
      <input
        required
        minLength={6}
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

export default FormWithReactHookFormPage;
