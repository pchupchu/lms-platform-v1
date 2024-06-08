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
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface ChapterAccessFormProps {
  initialData: {
    isFree: boolean;
  };
  courseId: string;
  chapterId: string;
}

const accessFormSchema = z.object({
  isFree: z.boolean().default(false),
});

type AccesFormSchemaType = z.infer<typeof accessFormSchema>;

const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<AccesFormSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(accessFormSchema),
    defaultValues: {
      isFree: initialData.isFree,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const toggleIsEditing = () => {
    setIsEditing((currentState) => !currentState);
  };

  const onSubmit = async (values: AccesFormSchemaType) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success('Chapter is updated');
      toggleIsEditing();
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='mt-6 rounded-md border bg-slate-100 p-4'>
      <div className='flex items-center justify-between font-medium'>
        Chapter access
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
        <div className='mt-2'>
          {initialData.isFree ? (
            <Badge className='bg-sky-700 uppercase'>free chapter</Badge>
          ) : (
            <Badge className='bg-slate-500 uppercase'>paid chapter</Badge>
          )}
        </div>
      )}

      {isEditing && (
        <Form {...form}>
          <form
            className='mt-4 space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='isFree'
              render={({ field }) => (
                <FormItem className='flex items-center space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                        id='access-settings'
                      />
                      <label
                        className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        htmlFor='access-settings'>
                        Check this box if you want to make this chapter free
                      </label>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
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

export default ChapterAccessForm;
