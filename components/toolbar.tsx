import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className='flex items-start'>
      <div className='flex w-full flex-wrap items-center justify-start gap-1 rounded-md border border-input bg-white p-1'></div>
    </div>
  );
};

export default Toolbar;
