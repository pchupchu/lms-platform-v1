'use client';

import { FormEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const FormWithReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const result = await new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve('Успешный результат');
      }, 2000),
    );
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-2'>
      <input
        {...register('email', {
          required: 'Email is required',
        })}
        type='email'
        placeholder='Email'
        className='rounded px-4 py-2'
      />
      <input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        type='password'
        placeholder='Password'
        className='rounded px-4 py-2'
      />
      <input
        {...register('confirmPassword', {
          required: 'Confirm password is required',
        })}
        type='password'
        placeholder='Confirm password'
        className='rounded px-4 py-2'
      />
      <button
        disabled={isSubmitting || !isValid}
        type='submit'
        className='rounded bg-green-500 py-2 text-lg font-medium text-white disabled:bg-gray-500'>
        Submit
      </button>
    </form>
  );
};

export default FormWithReactHookFormPage;
