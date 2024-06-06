'use client';

import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import { Underline } from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const editor = useEditor({
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
    content: value,
    editorProps: {
      attributes: {
        class:
          'flex flex-col min-h-[180px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      },
    },
    onUpdate: ({ editor }) => {
      const data = editor.getHTML();
      if (editor.isEmpty) {
        onChange('');
      } else {
        onChange(data);
      }
    },
  });

  if (!editor) return null;

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
