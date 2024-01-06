import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const { title } = await request.json();
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
