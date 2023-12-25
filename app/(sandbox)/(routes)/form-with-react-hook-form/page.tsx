'use client';

import { FormEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const FormWithReactHookFormPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const result = await new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve('Success');
      }, 2000),
    );
    console.log(result);
    reset();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-y-2'>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Incorrect email',
          },
        })}
        type='email'
        placeholder='Email'
        className='rounded px-4 py-2'
      />
      {errors.email && (
        <p className='text-red-500'>{`${errors.email.message}`}</p>
      )}
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
      {errors.password && (
        <p className='text-red-500'>{`${errors.password.message}`}</p>
      )}
      <input
        {...register('confirmPassword', {
          required: 'Confirm password is required',
          validate: (value) =>
            value === getValues('password') || 'Passwords must match',
        })}
        type='password'
        placeholder='Confirm password'
        className='rounded px-4 py-2'
      />
      {errors.confirmPassword && (
        <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
      )}
      <button
        disabled={isSubmitting}
        type='submit'
        className='rounded bg-green-500 py-2 text-lg font-medium text-white disabled:bg-gray-500'>
        Submit
      </button>
    </form>
  );
};

export default FormWithReactHookFormPage;
