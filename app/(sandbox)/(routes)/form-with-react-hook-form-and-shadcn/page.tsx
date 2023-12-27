'use client';

import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
});

const FormWithReactHookFormAndShadcn = () => {
  return <div>This is a new form</div>;
};

export default FormWithReactHookFormAndShadcn;
