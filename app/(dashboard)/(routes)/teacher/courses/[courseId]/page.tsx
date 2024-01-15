import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface CourseIdProps {
  params: {
    courseId: string;
  };
}

const CourseIdPage = async ({ params }: CourseIdProps) => {
  const { courseId } = params;
  const { userId } = auth();

  const course = await db.course.findUnique({ where: { id: courseId } });

  if (!course || course.userId !== userId) {
    return redirect('/');
  }

  return <div>{courseId}</div>;
};

export default CourseIdPage;
