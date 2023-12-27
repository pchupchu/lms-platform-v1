'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const FormWithReactHookFormAndShadcn = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    const result = await new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve('Success');
      }, 2000),
    );
    console.log(result);
  };

  return <div>This is a new form</div>;
};

export default FormWithReactHookFormAndShadcn;
