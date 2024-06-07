import IconBadge from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ChapterTitleForm from './_components/chapter-title-form';
import ChapterDescriptionForm from './_components/chapter-description-form';

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
      <div className='flex flex-col gap-y-2'>
        <h1 className='text-2xl font-medium'>Chapter Creation</h1>
        <span className='text-sm text-slate-700'>
          Complete all fields {completionText}
        </span>
      </div>
      <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <div className='space-y-4'>
          {/* Section `Customize your chapter` starts */}
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={LayoutDashboard} />
              <h2 className='text-xl'>Customize your chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
          {/* Section `Customize your chapter` ends */}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
