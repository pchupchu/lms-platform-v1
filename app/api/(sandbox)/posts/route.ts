import { NextRequest, NextResponse } from 'next/server';
import { posts } from '../_lib/posts';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  let currentPosts = posts;

  if (query) {
    currentPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return NextResponse.json(currentPosts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(body);
}
