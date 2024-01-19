'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const titleFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
});

type TitleFormSchemaType = z.infer<typeof titleFormSchema>;

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<TitleFormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(titleFormSchema),
    defaultValues: {
      title: initialData?.title,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const toggleIsEditing = () => {
    setIsEditing((currentState) => !currentState);
  };

  const onSubmit = async (values: TitleFormSchemaType) => {
    try {
      await axios.patch(`api/courses/${courseId}`, values);
      toast.success('Course title updated');
      toggleIsEditing();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='mt-6 rounded-md border bg-slate-100 p-4'>
      <div className='flex items-center justify-between font-medium'>
        {/* 
        WARN: Почему заголовок не в текстовом теге
        */}
        Course Title
        <Button variant={'ghost'} onClick={toggleIsEditing}>
          {isEditing ? (
            'Cancel'
          ) : (
            <>
              <PencilIcon className='mr-2 h-4 w-4' />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className='mt-2 text-sm'>{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            className='mt-4 space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='e.g. "Advanced web development"'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2 '>
              <Button type='submit' disabled={isSubmitting || !isValid}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
