import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import DraggableItem from '../components/DraggableItem';
import './PublishStyle.css'

const PublishedLayout = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadLayout = async () => {
            const docRef = doc(db, "layouts", "userLayout");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setItems(docSnap.data().layout);
            }
        };
        loadLayout();
    }, []);

    return (
        <div className='container'>
            <div className='header'>
                <h2>Published Layout</h2>
            </div>
            <div>
                {items.map(item => (
                    <DraggableItem key={item.id} id={item.id} content={item.content} />
                ))}
            </div>
        </div>
    );
};

export default PublishedLayout;
