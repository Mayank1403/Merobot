import React, { useState , useEffect} from "react";
import { Stage, Layer} from "react-konva";
import Rectangle from "./Rectangle";
import LineComponent from "./Line";
import { RECTANGLE } from "./MessageList";

// const initialRectangles = [
//   {
//     x: 10,
//     y: 10,
//     width: 100,
//     height: 100,
//     stroke: "red",
//     strokeWidth: 3,
//     id: "rect1",
//   },
//   {
//     x: 150,
//     y: 150,
//     width: 100,
//     height: 100,
//     stroke: "green",
//     strokeWidth: 3,
//     id: "rect2",
//   },
// ];

const Canvas = (props) => {
  const [rectangles, setRectangles] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState([]);
  const [canvasHeight, setCanvasHeight] = useState([]);
  const [canvasWidth, setCanvasWidth] = useState([]);

  const color = props.color;
  const fillColor = props.fillColor;
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleRectangleMouseDown = (event) => {
    checkDeselect(event);
    if (selectedId === null) {
      if (newAnnotation.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    }
  };

  const handleLineMouseDown = (event) => {
    //Run when we start drawing
    // drawing = true;

    if (newLine.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      const points = [x, y];
      setNewLine([
        { points, closed: false, key: "0", stroke: color, strokeWidth: 5 },
      ]);
    }
  };

  const handleRectangleMouseUp = (event) => {
    if (selectedId === null) {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: rectangles.length + 1,
          stroke: color,
          strokeWidth: 5,
        };
        if (annotationToAdd.width !== 0 && annotationToAdd.height !== 0)
          rectangles.push(annotationToAdd);
        setNewAnnotation([]);
        setRectangles(rectangles);
      }
    }
  };

  const handleLineMouseUp = (event) => {
    // drawing = false;

    if (newLine.length === 1) {
      const fx = newLine[0].points[0];
      const fy = newLine[0].points[1];
      const { x, y } = event.target.getStage().getPointerPosition();

      const dist = Math.sqrt(Math.pow(fx - x, 2) + Math.pow(fy - y, 2));
      let close = false;
      if (dist < 10) {
        close = true;
      }

      if(close){
        let input_label = prompt("Please enter a label for the component", "label");
        newLine[0].points.push(x);
        newLine[0].points.push(y);
        const newToAdd = {
          points: newLine[0].points,
          label: input_label,
          closed: close,
          stroke: color,
          fill: fillColor,
          key: lines.length + 1,
        };
        lines.push(newToAdd);
      }

      setNewLine([]);
      setLines(lines);
    }
  };

  const handleRectangleMouseMove = (event) => {
    if (selectedId === null) {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([
          {
            x: sx,
            y: sy,
            width: x - sx,
            height: y - sy,
            key: "0",
            stroke: color,
            strokeWidth: 5,
          },
        ]);
      }
    }
  };

  const handleLineMouseMove = (event) => {
    // if(!drawing)
    //     return;

    if (newLine.length === 1) {
      const { x, y } = event.target.getStage().getPointerPosition();
      let lastLine = newLine[0].points;
      lastLine = lastLine.concat([x, y]);

      setNewLine([
        {
          points: lastLine,
          closed: false,
          stroke: color,
          fill: fillColor,
          key: "0",
        },
      ]);
    }
  };

  useEffect(() => {
    const totalHeight = window.innerHeight;
    const totalWidth = window.innerWidth;
    setCanvasHeight(totalHeight * 0.80);
    setCanvasWidth(totalWidth * 0.75);
  }, []);

  
  const annotationsToDraw = [...rectangles, ...newAnnotation];
  const lineToDraw = [...lines, ...newLine];
  return (
    <Stage
      onMouseDown={
        props.tool === RECTANGLE
          ? handleRectangleMouseDown
          : handleLineMouseDown
      }
      onMouseUp={
        props.tool === RECTANGLE ? handleRectangleMouseUp : handleLineMouseUp
      }
      onMouseMove={
        props.tool === RECTANGLE
          ? handleRectangleMouseMove
          : handleLineMouseMove
      }
      width={window.innerWidth * 0.5}
      height={window.innerHeight * 0.75}
    >
      <Layer>
        {annotationsToDraw.map((value, i) => {
          return (
            <Rectangle
              key={value.key}
              shapeProps={value}
              isSelected={value.key === selectedId}
              onSelect={() => {
                selectShape(value.key);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
        {lineToDraw.map((line) => (
          <LineComponent
            key = {line.key}
            keyValue={line.key}
            points={line.points}
            stroke={line.stroke}
            fill={line.fill}
            closed={line.closed}
            strokeWidth= {3}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
