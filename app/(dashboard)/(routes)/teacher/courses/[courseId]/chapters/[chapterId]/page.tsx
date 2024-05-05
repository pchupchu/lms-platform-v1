import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
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

  return <div>{chapterId}</div>;
};

export default ChapterIdPage;
