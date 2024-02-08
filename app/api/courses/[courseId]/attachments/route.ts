import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

interface ContextProps {
  params: {
    courseId: string;
  };
}

export async function POST(request: NextRequest, { params }: ContextProps) {
  try {
    const { userId } = auth();
    const { url } = await request.json();
  } catch (error) {
    console.log('[ATTACHMENTS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
