import Canvas from "./Canvas";
import {useState} from 'react'
import NavBar from "./NavBar";
import "./style.css"

export const PENCIL = "pencil";
export const RECTANGLE = "rectangle";

function App() {
  const [tool, setTool] = useState(PENCIL);
  const [color, setColor] = useState("#000");
  const [query, setQuery] = useState('');

  const changeColor = (event) => {
    console.log(color);
    setColor(event.target.value);
    console.log(color);
  }

  return (
    <div className="App">
      <NavBar/>
      <div className = "container">
        <div className = "flex-child sidebar">
          <h2>Fill the Query</h2>
          <form className = "form">
            <label>Type in Input</label>
            <input 
              type = "text"
              required
              value = {query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <button>Submit</button>
          </form>
          <label>Select Tool</label>
          <select value={tool} onChange={(e) => setTool(e.target.value)}>
            <option value={PENCIL}>Pencil</option>
            <option value={RECTANGLE}>Rectangle</option>
          </select>
          <label>Stroke Color</label>
          <input type="color" value={color} onChange={changeColor}/>
        </div>

        <div className = "flex-child canvas">
          <Canvas tool={tool} color={color}/>
        </div>
      </div>
    </div>
  );
}

export default App;
