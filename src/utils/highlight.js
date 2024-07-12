import React from 'react';

export function highlight(text, query) {
    if (!text || !query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? <span key={index} style={{ color: 'blue' }}>{part}</span> : part
    );
}
