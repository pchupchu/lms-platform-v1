'use client';

import { Chapter } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ChaptersListProps {
  items: Chapter[];
  isUpdating: boolean;
  onEdit: (id: string) => void;
  onReorder: (updatedOrder: { id: string; position: number }[]) => void;
}

const ChaptersList = ({
  items,
  isUpdating,
  onEdit,
  onReorder,
}: ChaptersListProps) => {
  const [isClient, setIsClient] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <div>This is chapters list</div>;
};

export default ChaptersList;
