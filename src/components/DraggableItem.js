

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableItem = ({ id, type, content, color }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '8px',
        margin: '4px',
        background: '#e0e0e0',
        borderRadius: '4px',
    };

    const renderComponent = () => {
        switch (type) {
            case 'button':
                return (
                    <button style={{ padding: '8px 16px', border: 'none', borderRadius: '4px' }}>
                        {content}
                    </button>
                );
            case 'textInput':
                return <input style={{
                    padding: '5px',
                    height: '30px',
                    borderRadius: 5,
                    border: '1px solid black'
                }} type="text" placeholder={content} />;
            case 'checkbox':
                return (
                    <label>
                        <input type="checkbox" />
                        {content}
                    </label>
                );
            default:
                return <div>{content}</div>;
        }
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {renderComponent()}
        </div>
    );
};

export default DraggableItem;