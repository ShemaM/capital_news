'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Quote, Heading2 } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your story here...',
      }),
    ],
    content: content,
    immediatelyRender: false, // Fixes the SSR hydration error
    editorProps: {
      attributes: {
        // Updated styling with very visible Blockquotes
        class: 'prose prose-lg prose-slate max-w-none focus:outline-none min-h-[300px] prose-p:mb-4 prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-6 prose-headings:mb-4 prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:bg-gray-100 prose-blockquote:text-slate-700 prose-blockquote:rounded-r prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4',
       },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  // Helper to check active state for styling buttons
  const isActive = (type: string, options?: Record<string, unknown>) => editor.isActive(type, options);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-125">
      {/* Toolbar */}
      <div className="border-b border-slate-100 p-2 flex gap-1 bg-slate-50 sticky top-0 z-10 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('bold') ? 'bg-slate-200 text-black shadow-inner' : 'text-slate-500'}`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('italic') ? 'bg-slate-200 text-black shadow-inner' : 'text-slate-500'}`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </button>
        
        <div className="w-px bg-slate-300 mx-1 self-stretch my-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('heading', { level: 2 }) ? 'bg-slate-200 text-black shadow-inner' : 'text-slate-500'}`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('bulletList') ? 'bg-slate-200 text-black shadow-inner' : 'text-slate-500'}`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('orderedList') ? 'bg-slate-200 text-black shadow-inner' : 'text-slate-500'}`}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="w-px bg-slate-300 mx-1 self-stretch my-1"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-slate-200 transition-colors ${isActive('blockquote') ? 'bg-slate-200 text-black shadow-inner' : 'text-slate-500'}`}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 p-6 cursor-text bg-white" onClick={() => editor.chain().focus().run()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;