'use client';

import { Chapter } from '@prisma/client';

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
  return <div>This is chapters list</div>;
};

export default ChaptersList;
