'use client';

import { TypeOf, z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CreatePage = () => {
  return <div>This is a Create page</div>;
};

export default CreatePage;
