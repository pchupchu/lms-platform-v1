import { Editor } from '@tiptap/react';
import { Toggle } from './ui/toggle';
import {
  Bold,
  Code,
  Heading,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from 'lucide-react';

interface ToolbarProps {
  editor: Editor;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className='flex items-start'>
      <div className='flex w-full flex-wrap items-center justify-start gap-1 rounded-md border border-input bg-white p-1'>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }>
          <Heading className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}>
          <Bold className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('underline')}
          onPressedChange={() =>
            editor.chain().focus().toggleUnderline().run()
          }>
          <Underline className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('bulletList')}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }>
          <List className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('orderedList')}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }>
          <ListOrdered className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('blockquote')}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }>
          <Quote className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('codeBlock')}
          onPressedChange={() =>
            editor.chain().focus().toggleCodeBlock().run()
          }>
          <Code className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('undo')}
          onPressedChange={() => editor.chain().focus().undo().run()}>
          <Undo className='h-4 w-4' />
        </Toggle>
        <Toggle
          size='sm'
          variant={'outline'}
          pressed={editor.isActive('redo')}
          onPressedChange={() => editor.chain().focus().redo().run()}>
          <Redo className='h-4 w-4' />
        </Toggle>
      </div>
    </div>
  );
};

export default Toolbar;
