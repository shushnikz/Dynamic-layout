// import React, { useState } from "react";
// import { DndContext } from "@dnd-kit/core";
// import { db } from "./firebase";
// import { collection, addDoc, getDocs } from "firebase/firestore";
// import Draggable from "./components/Draggable";  // Import Draggable here
// import { Label } from "./components/Label";
// import { InputBox } from "./components/InputBox";
// import { Checkbox } from "./components/Checkbox";
// import { Button } from "./components/Button";
// import { Table } from "./components/Table";

// const COMPONENTS = {
//   label: Label,
//   inputBox: InputBox,
//   checkbox: Checkbox,
//   button: Button,
//   table: Table,
// };

// function App() {
//   const [layout, setLayout] = useState([]);
//   const [draggedComponent, setDraggedComponent] = useState(null);

//   const handleDragStart = (event) => {
//     setDraggedComponent(event.active.id);
//   };

//   const handleDragEnd = (event) => {
//     if (!event.over) return;
//     const newLayout = [...layout, draggedComponent];
//     setLayout(newLayout);
//     setDraggedComponent(event.active.id);
//   };

//   const saveLayout = async () => {
//     try {
//       await addDoc(collection(db, "layouts"), { layout });
//       alert("Layout saved successfully!");
//     } catch (error) {
//       console.error("Error saving layout: ", error);
//     }
//   };

//   const loadLayout = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "layouts"));
//       const layouts = querySnapshot.docs.map((doc) => doc.data().layout);
//       setLayout(layouts[layouts.length - 1]); // Load the latest layout
//     } catch (error) {
//       console.error("Error loading layout: ", error);
//     }
//   };

//   const publishLayout = () => {
//     const newWindow = window.open();
//     newWindow.document.write("<html><body><div id='layout'></div></body></html>");
//     newWindow.document.write("<script>" + layoutToHtml(layout) + "</script>");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Dynamic Page Builder</h1>
//       <div style={{ display: "flex", gap: "20px" }}>
//         <div>
//           <h3>Components</h3>
//           <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
//             <div>
//               <Draggable id="label">Label</Draggable>
//               <Draggable id="inputBox">Input Box</Draggable>
//               <Draggable id="checkbox">Checkbox</Draggable>
//               <Draggable id="button">Button</Draggable>
//               <Draggable id="table">Table</Draggable>
//             </div>
//           </DndContext>
//         </div>
//         <div>
//           <h3>Page Layout</h3>
//           <div>
//             {layout.map((componentType, index) => {
//               const Component = COMPONENTS[componentType];
//               return <Component key={index} />;
//             })}
//           </div>
//         </div>
//       </div>
//       <button onClick={saveLayout}>Save Layout</button>
//       <button onClick={loadLayout}>Load Layout</button>
//       <button onClick={publishLayout}>Publish</button>
//     </div>
//   );
// }

// const layoutToHtml = (layout) => {
//   return layout
//     .map((componentType) => {
//       switch (componentType) {
//         case "label":
//           return "<label>Label Component</label>";
//         case "inputBox":
//           return "<input type='text' placeholder='Input Box' />";
//         case "checkbox":
//           return "<input type='checkbox' />";
//         case "button":
//           return "<button>Button Component</button>";
//         case "table":
//           return "<table border='1'><tr><td>Data</td></tr></table>";
//         default:
//           return "";
//       }
//     })
//     .join("");
// };

// export default App;

import React from 'react';
import './App.css'
import DragDropLayout from './components/DragDropLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublishedLayout from './pages/PublishedLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DragDropLayout />} />
        <Route path="/publishedLayout" element={<PublishedLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

