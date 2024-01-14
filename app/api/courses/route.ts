import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const { title } = await request.json();

    /*
    WARN: зачем эта проверка? 
    */
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.create({ data: { userId, title } });
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
