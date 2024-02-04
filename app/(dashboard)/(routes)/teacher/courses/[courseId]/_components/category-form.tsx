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
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import { cn } from '@/lib/utils';

interface CategoryFormProps {
  initialData: {
    categoryId: string | null;
  };
  courseId: string;
  categories: {
    id: string;
    name: string;
  }[];
}

const categoryFormSchema = z.object({
  categoryId: z.string().trim().min(1, 'Category is required'),
});

type CategoryFormSchemaType = z.infer<typeof categoryFormSchema>;

const CategoryForm = ({
  initialData,
  courseId,
  categories,
}: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<CategoryFormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categoryId: initialData?.categoryId ?? '',
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const toggleIsEditing = () => {
    setIsEditing((currentState) => !currentState);
  };

  const onSubmit = async (values: CategoryFormSchemaType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
      toggleIsEditing();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const selectedCategory = categories.find(
    (category) => category.id === initialData.categoryId,
  )?.name;

  return (
    <div className='mt-6 rounded-md border bg-slate-100 p-4'>
      <div className='flex items-center justify-between font-medium'>
        {/* 
        WARN: Почему заголовок не в текстовом теге
        */}
        Course Category
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
      {!isEditing && (
        <p
          className={cn(
            'mt-2 text-sm',
            !initialData.categoryId && 'italic text-slate-500',
          )}>
          {selectedCategory ?? 'No category'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className='mt-4 space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormControl></FormControl>
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

export default CategoryForm;
