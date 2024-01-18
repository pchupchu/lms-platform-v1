import { z } from 'zod';

('use client');

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const titleFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
});

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  return <div>This is a title form</div>;
};

export default TitleForm;
