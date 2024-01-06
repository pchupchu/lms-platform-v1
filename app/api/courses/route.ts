import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
