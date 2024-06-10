'use client';

import { Button } from '@/components/ui/button';
import { PencilIcon, PlusCircle, Video } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import FileUpload from '@/components/file-upload';
import { MuxData } from '@prisma/client';

interface ChapterVideoFormProps {
  initialData: {
    videoUrl: string | null;
    muxData: MuxData | null;
  };
  courseId: string;
  chapterId: string;
}

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleIsEditing = () => {
    setIsEditing((currentState) => !currentState);
  };

  const onSubmit = async (values: { videoUrl: string }) => {
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

  const handleOnChange = (url: string) => {
    if (url) {
      onSubmit({ videoUrl: url });
    }
  };

  return (
    <div className='mt-6 rounded-md border bg-slate-100 p-4'>
      <div className='flex items-center justify-between font-medium'>
        Chapter Video
        <Button variant={'ghost'} onClick={toggleIsEditing}>
          {isEditing && <>Cancel</>}
          {!isEditing && initialData.videoUrl && (
            <>
              <PencilIcon className='mr-2 h-4 w-4' />
              Edit
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className='mr-2 h-4 w-4' />
              Add
            </>
          )}
        </Button>
      </div>
      {!isEditing && !initialData.videoUrl && (
        <div className='flex h-60 items-center justify-center rounded-md bg-slate-200'>
          <Video className='h-10 w-10 text-slate-500' />
        </div>
      )}
      {!isEditing && initialData.videoUrl && (
        <div className='relative mt-2 aspect-video'></div>
      )}
      {isEditing && (
        <>
          <FileUpload endpoint='chapterVideo' onChange={handleOnChange} />
          <p className='mt-4 text-center text-xs text-muted-foreground'>
            Upload this chapter&apos;s video
          </p>
        </>
      )}
    </div>
  );
};

export default ChapterVideoForm;
