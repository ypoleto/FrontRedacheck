import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import './stylevisu.css';

const TipTapVisualizer = (props) => {
    const editor = useEditor({
        editable: false,
        extensions: [
            Placeholder.configure({
                placeholder: 'Sua redação vai aqui',
            }),
        ],
        content: props.content || '',
    });

    if (!editor) {
        return null;
    }


    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default TipTapVisualizer;
