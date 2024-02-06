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
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/lib/format';

interface PriceFormProps {
  initialData: {
    price: number | null;
  };
  courseId: string;
}

const priceFormSchema = z.object({
  price: z.preprocess(
    (a) => parseFloat(a as string),
    z
      .number({ invalid_type_error: 'NaN is returned' })
      .nonnegative('Number must be equal or greater then 0'),
  ),
});

type PriceFormSchemaType = z.infer<typeof priceFormSchema>;

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<PriceFormSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(priceFormSchema),
    defaultValues: {
      price: initialData?.price ?? 0,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const toggleIsEditing = () => {
    setIsEditing((currentState) => !currentState);
  };

  const onSubmit = async (values: PriceFormSchemaType) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated');
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
        Course Price
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
            initialData.price ?? 'italic text-slate-500',
          )}>
          {initialData.price !== null
            ? formatPrice(initialData.price)
            : 'No price'}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            className='mt-4 space-y-4'
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Set a price for your course'
                      type='number'
                      step={0.01}
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

export default PriceForm;
