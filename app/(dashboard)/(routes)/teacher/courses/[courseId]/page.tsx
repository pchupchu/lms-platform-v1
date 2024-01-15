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

  const requredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requredFields.length;
  const completedFields = requredFields.filter((requredField) =>
    Boolean(requredField),
  ).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>Course Setup</h1>
          <span className='text-sm text-slate-700'>
            Comlete all fields {completionText}
          </span>
        </div>
      </div>
      <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2'></div>
    </div>
  );
};

export default CourseIdPage;
