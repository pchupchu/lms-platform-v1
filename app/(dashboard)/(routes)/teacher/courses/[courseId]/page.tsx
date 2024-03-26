import IconBadge from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import TitleForm from './_components/title-form';
import DescriptionForm from './_components/description-form';
import ImageForm from './_components/image-form';
import CategoryForm from './_components/category-form';
import PriceForm from './_components/price-form';
import AttachmentForm from './_components/attachment-form';
import ChaptersForm from './_components/chapters-form';

interface CourseIdProps {
  params: {
    courseId: string;
  };
}

const CourseIdPage = async ({ params }: CourseIdProps) => {
  const { courseId } = params;
  const { userId } = auth();

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      attachments: { orderBy: { createdAt: 'desc' } },
      chapters: { orderBy: { position: 'asc' } },
    },
  });

  if (!course || course.userId !== userId) {
    return redirect('/');
  }

  const categories = await db.category.findMany({ orderBy: { name: 'asc' } });

  const requredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price !== null,
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
      <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Section "Customize your course" starts */}
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge icon={LayoutDashboard} />
            <h2 className='text-xl'>Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            categories={categories}
          />
        </div>
        {/* Section "Customize your course" ends */}
        <div className='space-y-6'>
          {/* Section "Course chapters" starts */}
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ListChecks} />
              <h2 className='text-xl'>Course chapters</h2>
            </div>
            <ChaptersForm initialData={course} courseId={course.id} />
          </div>
          {/* Section "Course chapters" ends */}

          {/* Section "Sell your course" starts */}
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={CircleDollarSign} />
              <h2 className='text-xl'>Sell your course</h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} />
          </div>
          {/* Section "Sell your course" ends */}

          {/* Section "Resources & attachments" starts */}
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={File} />
              <h2 className='text-xl'>Resources & attachments</h2>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} />
          </div>
          {/* Section "Resources & attachments" ends */}
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
