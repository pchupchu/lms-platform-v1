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

  return <div>This is a Create page</div>;
};

export default CreatePage;
