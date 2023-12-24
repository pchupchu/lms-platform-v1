const FormWithoutReactHookFormPage = () => {
  return (
    <form className='flex flex-col gap-y-2'>
      <input type='email' placeholder='Email' className='rounded px-4 py-2' />
      <input
        type='password'
        placeholder='Password'
        className='rounded px-4 py-2'
      />
      <input
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
