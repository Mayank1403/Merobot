import React from "react";
import {Line} from "react-konva";

const LineComponent = (props) => {
  // const [lines, setLines] = useState([]);
  // const [newLine, setNewLine] = useState([]);

  // let drawing = false;

  // const handleMouseDown = event => {
  //     //Run when we start drawing
  //     // drawing = true;

  //     if(newLine.length === 0){
  //         const { x, y } = event.target.getStage().getPointerPosition();
  //         const points = [x, y];
  //         setNewLine([{points, closed: false, key: "0"}]);
  //     }
  // }

  // const handleMouseUp = event=>{
  // drawing = false;

  //     if(newLine.length === 1){
  //         const fx = newLine[0].points[0];
  //         const fy = newLine[0].points[1];
  //         const { x, y } = event.target.getStage().getPointerPosition();

  //         const dist = Math.sqrt(Math.pow(fx - x, 2) + Math.pow(fy - y, 2));
  //         let close = false;
  //         if (dist < 10) {
  //             close = true;
  //         }
  //         newLine[0].points.push(x);
  //         newLine[0].points.push(y);
  //         const newToAdd = {
  //             points: newLine[0].points,
  //             closed: close,
  //             key: lines.length + 1
  //         };
  //         if(close === true)
  //         lines.push(newToAdd);
  //         setNewLine([]);
  //         setLines(lines);
  //     }

  // }

  // const handleMouseEvent = event=>{
  //     // if(!drawing)
  //     //     return;

  //     if(newLine.length === 1){
  //         const {x, y} = event.target.getStage().getPointerPosition();
  //         let lastLine = newLine[0].points;
  //         lastLine = lastLine.concat([x, y]);

  //         setNewLine([
  //             {
  //                 points: lastLine,
  //                 closed: false,
  //                 key: "0"
  //             }
  //         ])
  //     }
  // }

  // const lineToDraw = [...lines, ...newLine];
  return (
    // <div>
    // <Stage
    //     width = {window.innerWidth}
    //     height = {window.innerHeight}
    //     onMouseDown = {handleMouseDown}
    //     onMouseUp = {handleMouseUp}
    //     onMouseMove = {handleMouseEvent}
    // >

    //     <Layer>
    //         <Text text = "Draw a thing!"/>
    //         {lineToDraw.map(line=>(
    <Line
      key={props.keyValue}
      points={props.points}
      stroke={props.stroke}
      closed={props.closed}
      fill={props.fill}
      strokeWidth={props.strokeWidth}
    />
    // ))}
    //     </Layer>
    // </Stage>
    // </div>
  );
};

export default LineComponent;
