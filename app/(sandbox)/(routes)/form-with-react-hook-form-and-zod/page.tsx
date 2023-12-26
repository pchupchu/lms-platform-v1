'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const FormWithReactHookFormPageAndZod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

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
        {...register('email')}
        type='email'
        placeholder='Email'
        className='rounded px-4 py-2'
      />
      {errors.email && (
        <p className='text-red-500'>{`${errors.email.message}`}</p>
      )}
      <input
        {...register('password')}
        type='password'
        placeholder='Password'
        className='rounded px-4 py-2'
      />
      {errors.password && (
        <p className='text-red-500'>{`${errors.password.message}`}</p>
      )}
      <input
        {...register('confirmPassword')}
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

export default FormWithReactHookFormPageAndZod;
