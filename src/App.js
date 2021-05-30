import Canvas from "./Canvas";
import {useState} from 'react'

export const PENCIL = "pencil";
export const RECTANGLE = "rectangle";

function App() {
  const [tool, setTool] = useState(PENCIL);

  return (
    <div className="App">
      <select value={tool} onChange={(e) => setTool(e.target.value)}>
        <option value={PENCIL}>Pencil</option>
        <option value={RECTANGLE}>Rectangle</option>
      </select>
      <Canvas tool={tool}/>
    </div>
  );
}

export default App;
