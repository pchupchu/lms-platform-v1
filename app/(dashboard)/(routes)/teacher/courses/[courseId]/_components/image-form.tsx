'use client';

import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

interface ImageFormProps {
  initialData: {
    imageUrl: string | null;
  };
  courseId: string;
}

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleIsEditing = () => {
    setIsEditing((currentState) => !currentState);
  };

  const onSubmit = async (values: { imageUrl: string }) => {
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
        Course Image
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
      {!isEditing && <></>}
      {isEditing && <></>}
    </div>
  );
};

export default ImageForm;
