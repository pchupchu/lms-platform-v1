'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // Do something with the response
        // console.log('[RESPONSE_FROM_UPLOADTHING]', res);
        onChange(res[0].url);
        toast.success('Upload Completed');
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error('Something went wrong');
        console.log('[UPLOADTHING]', error.message);
      }}
    />
  );
};

export default FileUpload;
