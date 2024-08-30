import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import UniqueID from '@tiptap-pro/extension-unique-id';
import './style.css';
import CharacterCount from '@tiptap/extension-character-count';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';

const TipTapEditor = (props) => {
  const [limit, setLimit] = useState()
  const editor = useEditor({
    extensions: [
      UniqueID.configure({
        types: ['paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Sua redação vai aqui',
      }),
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {},
        },
      }),
      Bold,
      Italic,
    ],
    content: props.content || '',
  });

  useEffect(() => {
    setLimit(props.limit)
  }, [props])


  if (!editor) {
    return null;
  }



  return (
    <div>
      <div className="editor-menu">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FormatBoldIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FormatItalicIcon />
        </button>
      </div>
      <EditorContent editor={editor} onChange={props.handleChangeEditor(editor.getHTML())} />

    </div>
  );
};

export default TipTapEditor;
