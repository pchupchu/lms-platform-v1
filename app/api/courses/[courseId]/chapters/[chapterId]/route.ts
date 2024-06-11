import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import Mux from '@mux/mux-node';
import { UTApi } from 'uploadthing/server';

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

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

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: { ...values },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({ where: { id: existingMuxData.id } });

        await utapi.deleteFiles(existingMuxData.name);
      }

      const asset = await video.assets.create({
        input: [{ url: values.videoUrl }],
        playback_policy: ['public'],
        encoding_tier: 'baseline',
      });

      await db.muxData.create({
        data: {
          chapterId: params.chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0].id,
          name: values.videoUrl.split('/').pop(),
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log('[CHAPTER_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
