'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CreatePage = () => {
  const form = useForm<FormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = (values: FormSchemaType) => {
    console.log(values);
  };

  return (
    <div className='mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center'>
      <div>
        <h1 className='text-2xl'>Name your course</h1>
        <p className='text-sm text-slate-600'>
          How would you like to name your course? Don&apos;t worry, you can
          change this later
        </p>
      </div>
    </div>
  );
};

export default CreatePage;
