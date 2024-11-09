import React from "react";
import { useDraggable } from "@dnd-kit/core";

function Draggable({ id, children }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id,
    });

    const style = {
        padding: "8px",
        border: "1px solid #ccc",
        marginBottom: "5px",
        backgroundColor: isDragging ? "#ddd" : "#fff",
        cursor: "move",
    };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
            {children}
        </div>
    );
}

export default Draggable;
