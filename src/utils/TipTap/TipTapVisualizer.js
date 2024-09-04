import React, { useState } from 'react';
import './css/style.css';

function TipTapVisualizer({ content, highlightedId, setHighlightedId, handleCommentClick }) {
    // Função para converter HTML em elementos JSX
    const parseContent = (html) => {
        // Cria um parser temporário para evitar XSS
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return Array.from(doc.body.childNodes).map((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'p') {
                const dataId = node.getAttribute('data-id');
                const isHighlighted = dataId === highlightedId;
                return (
                    <p
                        key={dataId}
                        data-id={dataId}
                        className={isHighlighted ? 'highlighted' : ''}
                        onMouseEnter={() => setHighlightedId(dataId)}
                        onMouseLeave={() => setHighlightedId(null)}
                        onClick={handleCommentClick}
                    >
                        {node.textContent}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <div>
            {parseContent(content)}
        </div>
    );
}

export default TipTapVisualizer;
