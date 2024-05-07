import { NextRequest, NextResponse } from 'next/server';

interface ContextProps {
  params: {
    courseId: string;
    chapterId: string;
  };
}

export async function PATCH(request: NextRequest, { params }: ContextProps) {
  try {
  } catch (error) {
    console.log('[CHAPTER_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
