// import Canvas from "./Canvas";
import {useState} from 'react'
import NavBar from "./NavBar";
import "./style.css"

//Image
import First from "./images/first.png";
import Second from "./images/second.png";
import Third from "./images/third.png";
//Modal
import Modal from "./Modal";
import Form from "./Form";

export const PENCIL = "pencil";
export const RECTANGLE = "rectangle";

function App() {
  const [tool, setTool] = useState(PENCIL);
  const [color, setColor] = useState("#000");
  const [fillColor, setFillColor] = useState("#000");
  const [query, setQuery] = useState('');

  const [selection, setSelection] = useState(false);
  const images = [
    {url: First, id: 1},
    {url: Second, id: 2},
    {url: Third, id: 3}
  ]
  const openCanvas = (id) => {
    if(id === 2){
      setTool(RECTANGLE);
    }
    else{
      setTool(PENCIL);
    }
    setSelection(true);
  }


  const closeModal = () => {
    setSelection(false);
  }

  const changeColor = (event) => {
    console.log(color);
    setColor(event.target.value);
    console.log(color);
  }

  const changeFillColor = (event) => {
    console.log(fillColor);
    setFillColor(event.target.value);
    console.log(fillColor);
  }

  return (
    <div className="App">
      <NavBar/>
      <div className = "container">
        <Form query={query} setQuery = {setQuery} tool={tool} setTool={setTool} color={color} changeColor = {changeColor} fillColor={fillColor} changeFillColor={changeFillColor}/>


        <div className = "flex-child canvas">

          {images.map(image =>{
            return <img src = {image.url} key = {image.id} alt = "" onClick = {e=>openCanvas(image.id)}/>
          })}
          <Modal show = {selection} color = {color} closeModal = {closeModal} query={query} setQuery = {setQuery} tool={tool} setTool={setTool} changeColor = {changeColor} fillColor={fillColor} changeFillColor={changeFillColor}/>
          {/* {selection && <Canvas tool={tool} color={color}/>} */}

        </div>
      </div>
    </div>
  );
}

export default App;
