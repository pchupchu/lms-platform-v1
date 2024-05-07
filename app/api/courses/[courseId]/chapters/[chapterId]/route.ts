import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

interface ContextProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: ContextProps) {
  try {
    const { userId } = auth();
    const values = await request.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  } catch (error) {
    console.log('[CHAPTER_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
