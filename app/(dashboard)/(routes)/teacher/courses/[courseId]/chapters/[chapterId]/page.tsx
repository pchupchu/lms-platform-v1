import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface ChapterIdPageProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const { courseId, chapterId } = params;

  const { userId } = auth();

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
      course: true,
    },
  });

  if (!chapter || chapter.course.userId !== userId) {
    return redirect('/');
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter((requiredFields) =>
    Boolean(requiredFields),
  ).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className='flex flex-col p-6'>
      <Link
        className='mb-6 flex items-center gap-2 text-sm transition hover:opacity-75'
        href={`/teacher/courses/${params.courseId}`}>
        <ArrowLeft className='h-4 w-4 flex-shrink-0' />
        Back to course setup
      </Link>
    </div>
  );
};

export default ChapterIdPage;
