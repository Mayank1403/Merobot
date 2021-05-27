import React from 'react';
import './App.css';
import {useState} from 'react';
import Canvas from './Canvas';
import Rectangle from './Rectangle';
// import CanvasTry from './CanvasTry';

function App() {
  const [selection, setSelection] = useState('pencil');

  return (
    <div className="App">
      <h1>Hello This is just the starting</h1>
      <select
        value = {selection}
        onChange = {e=>setSelection(e.target.value)}
      >
        <option value = "pencil">Pencil</option>
        <option value = "rectangle">Rectangle</option>
      </select>
      {(selection === "pencil") && <Canvas/>}
      {/* {(selection === "rectangle") && <CanvasTry/>} */}
      {(selection === "rectangle") && <Rectangle/>}
    </div>
  );
}

export default App;
