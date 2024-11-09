import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import DraggableItem from './DraggableItem';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './DropStyle.css'
import { useNavigate } from 'react-router-dom';


const DragDropLayout = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState([
        { id: '1', type: 'button', content: 'Button 1' },
        { id: '2', type: 'textInput', content: 'Enter text here' },
        { id: '3', type: 'button', content: 'Button 2' },
        { id: '4', type: 'checkbox', content: 'Check here' }
    ]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                console.log("items", items)
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const saveLayoutToFirebase = async () => {
        try {
            await setDoc(doc(db, "layouts", "userLayout"), { layout: items });
            alert("Layout saved successfully!");
        } catch (e) {
            console.error("Error saving layout: ", e);
        }
    };

    const loadLayoutFromFirebase = async () => {
        try {
            const docRef = doc(db, "layouts", "userLayout");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const loadedItems = docSnap.data().layout;

                // Ensure each item has necessary properties
                const validatedItems = loadedItems.map(item => ({
                    id: item.id,
                    type: item.type || 'button',
                    content: item.content || '',
                    color: item.color || null,
                }));
                alert("Layout loaded successfully")

                setItems(validatedItems);
            } else {
                console.log("No layout found in the database");
            }
        } catch (e) {
            console.error("Error loading layout: ", e);
        }
    };

    const publishLayout = () => {
        navigate('/publishedLayout', '_blank');
    };

    return (
        <div>
            <div className='layout__wrapper'>
                <div className="card">
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <div className="header">
                            <h1>Dynamic Layout</h1>
                        </div>
                        <SortableContext items={items.map(item => item.id)}>
                            <div className='container'>
                                {items.map(item => (
                                    <DraggableItem key={item.id} id={item.id} type={item.type} content={item.content} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

            </div>
            <div className='button_container'>
                <button className='buttonStyle' onClick={saveLayoutToFirebase}>Save Layout</button>
                <button className='buttonStyle' onClick={loadLayoutFromFirebase}>Load Layout</button>
                <button className='buttonStyle' onClick={publishLayout}>Publish Layout</button>
            </div>
        </div>
    );
};

export default DragDropLayout;
