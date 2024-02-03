'use client';

import { Button } from '@/components/ui/button';
import { ImageIcon, PencilIcon, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';
import FileUpload from '@/components/file-upload';

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

  const handleOnChange = (url?: string) => {
    if (url) {
      onSubmit({ imageUrl: url });
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
          {isEditing && <>Cancel</>}
          {!isEditing && initialData.imageUrl && (
            <>
              <PencilIcon className='mr-2 h-4 w-4' />
              Edit
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className='mr-2 h-4 w-4' />
              Add
            </>
          )}
        </Button>
      </div>
      {!isEditing && !initialData.imageUrl && (
        <div className='flex h-60 items-center justify-center rounded-md bg-slate-200'>
          <ImageIcon className='h-10 w-10 text-slate-500' />
        </div>
      )}
      {!isEditing && initialData.imageUrl && (
        <div className='relative mt-2 aspect-video'>
          <Image
            className='object-cover'
            src={initialData.imageUrl}
            alt='Course image'
            fill
          />
        </div>
      )}
      {isEditing && (
        <>
          <FileUpload endpoint='courseImage' onChange={handleOnChange} />
          <p className='mt-4 text-center text-xs text-muted-foreground'>
            16:9 aspect ratio is recommended
          </p>
        </>
      )}
    </div>
  );
};

export default ImageForm;
