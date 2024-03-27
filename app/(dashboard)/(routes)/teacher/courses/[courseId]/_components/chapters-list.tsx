'use client';

import { Chapter } from '@prisma/client';
import { useEffect, useState } from 'react';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './sortable-item';

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log({ active, over });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={chapters} strategy={verticalListSortingStrategy}>
        {chapters.map((chapter) => (
          <SortableItem
            chapter={chapter}
            key={chapter.id}
            onEdit={onEdit}
            isUpdating={isUpdating}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ChaptersList;
