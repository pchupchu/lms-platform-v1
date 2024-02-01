'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  return <div></div>;
};

export default FileUpload;
