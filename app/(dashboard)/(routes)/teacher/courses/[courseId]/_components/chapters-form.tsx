'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
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
import { Chapter, Course } from '@prisma/client';
import { Input } from '@/components/ui/input';
import ChaptersList from './chapters-list';

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const chaptersFormSchema = z.object({
  chapterTitle: z.string().trim().min(1, 'Chapter title is required'),
});

type ChaptersFormSchemaType = z.infer<typeof chaptersFormSchema>;

const ChaptersForm = ({ initialData, courseId }: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const form = useForm<ChaptersFormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(chaptersFormSchema),
    defaultValues: {
      chapterTitle: '',
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const toggleIsCreating = () => {
    setIsCreating((currentState) => !currentState);
  };

  const onSubmit = async (values: ChaptersFormSchemaType) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success('Chapter is created');
      toggleIsCreating();
      form.reset();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleOnReorder = async (
    updatedOrder: { id: string; position: number }[],
  ) => {
    try {
      setIsUpdating(true);

      await axios.patch(`/api/courses/${courseId}/chapters/reorder`, {
        list: updatedOrder,
      });
      toast.success('Order is changed');
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOnEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className='mt-6 rounded-md border bg-slate-100 p-4'>
      <div className='flex items-center justify-between font-medium'>
        {/* 
        WARN: Почему заголовок не в текстовом теге
        */}
        Course Chapters
        <Button variant={'ghost'} onClick={toggleIsCreating}>
          {isCreating ? (
            'Cancel'
          ) : (
            <>
              <PlusCircle className='mr-2 h-4 w-4' />
              Add
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            className='mt-4 space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='chapterTitle'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='e.g. Introduction to the course'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2 '>
              <Button type='submit' disabled={isSubmitting || !isValid}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}

      {!isCreating && (
        <>
          {initialData.chapters.length === 0 && (
            <p className='mt-2 text-sm italic text-slate-500'>No chapters</p>
          )}
          {initialData.chapters.length !== 0 && (
            <ChaptersList
              items={initialData.chapters}
              isUpdating={isUpdating}
              onEdit={handleOnEdit}
              onReorder={handleOnReorder}
            />
          )}
          <p className='mt-4 text-center text-xs text-muted-foreground'>
            Drag and drop to reorder the chapters
          </p>
        </>
      )}
    </div>
  );
};

export default ChaptersForm;
