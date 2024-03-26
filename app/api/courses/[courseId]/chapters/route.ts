import { NextRequest } from 'next/server';

interface ContextProps {
  params: {
    courseId: string;
  };
}

export async function POST(request: NextRequest, { params }: ContextProps) {
  try {
  } catch (error) {
    console.log('[CHAPTERS]', error);
  }
}
