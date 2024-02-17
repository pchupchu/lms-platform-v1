import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

interface ContextProps {
  params: {
    courseId: string;
    attachmentId: string;
  };
}

export async function DELETE(request: NextRequest, { params }: ContextProps) {
  try {
    const { userId } = auth();
    const utapi = new UTApi();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: params.courseId,
        id: params.attachmentId,
      },
    });

    await utapi.deleteFiles(attachment.name);

    return NextResponse.json(attachment);
  } catch (error) {
    console.log('[ATTACHMENT_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
