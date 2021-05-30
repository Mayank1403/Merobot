import Canvas from "./Canvas";
import {useState} from 'react'
import NavBar from "./NavBar";
import "./style.css"

export const PENCIL = "pencil";
export const RECTANGLE = "rectangle";

function App() {
  const [tool, setTool] = useState(PENCIL);
  const [color, setColor] = useState("#e66465");


  const changeColor = (event) => {
    console.log(color);
    setColor(event.target.value);
    console.log(color);
  }

  return (
    <div className="App">
      <NavBar/>
      <label>Select Tool</label>
      <select value={tool} onChange={(e) => setTool(e.target.value)}>
        <option value={PENCIL}>Pencil</option>
        <option value={RECTANGLE}>Rectangle</option>
      </select>

      <label>Color</label>
      <input type="color" value={color} onChange={changeColor}/>
      <Canvas tool={tool} color={color}/>
    </div>
  );
}

export default App;
