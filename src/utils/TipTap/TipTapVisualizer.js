import React from 'react';
import './stylevisu.css';

const TipTapVisualizer = ({ content, highlightedId, handleCommentClick }) => {
    const applyHighlight = (html) => {
        return html.replace(
            /<p data-id="([^"]+)"/g,
            (match, id) => `<p data-id="${id}" class="${id === highlightedId ? 'highlighted' : ''}"`
        );
    };

    return (
        <div onClick={handleCommentClick}
            dangerouslySetInnerHTML={{ __html: applyHighlight(content) }}
        />
    );
};

export default TipTapVisualizer;
