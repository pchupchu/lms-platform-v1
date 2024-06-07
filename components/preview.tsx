import BulletList from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { lowlight } from 'lowlight';
import { useEffect } from 'react';

interface PreviewProps {
  value: string;
}

const Perview = ({ value }: PreviewProps) => {
  const editor = useEditor({
    editable: false,
    editorProps: {
      attributes: {
        class: 'text-sm outline-none cursor-auto',
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2],
          HTMLAttributes: {
            class: 'text-xl font-semibold',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'p-4 my-4 border-l-4 border-gray-300 bg-gray-50',
          },
        },
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: 'pl-4 list-disc',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'pl-4 list-decimal',
        },
      }),
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-[#0d0d0d;] font-mono px-3 py-4 rounded-lg text-white',
        },
      }),
    ],
  });

  useEffect(() => {
    editor?.commands.setContent(value);
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

export default Perview;
