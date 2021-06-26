import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import Rectangle from "./Rectangle";
import LineComponent from "./Line";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setRectangles } from "../../Redux/Ducks/Rectangles";
import { setLines } from "../../Redux/Ducks/Lines";

export const RECTANGLE = "rect";
export const LINE = "line";

const Canvas = (props) => {
  
  const dispatch = useDispatch();

  // const [rectangles, setRectangles] = useState([]);
  //Rectangle variables
  const rectangles = useSelector((state) => state.Rectangles.rect); //main array of objects
  console.log(rectangles)
  const [newAnnotation, setNewAnnotation] = useState([]); //temporary array of object
  const [selectedId, selectShape] = useState(null);

  // const [lines, setLines] = useState([]);
  //Line variables
  const lines = useSelector((state) => state.Lines.line); //main array of objects
  const [newLine, setNewLine] = useState([]); //temporary array of object
  const [selectedLineId, selectLineShape] = useState(null);

  //Basic Variables
  const color = props.color;
  const fillColor = props.fillColor;
  
  const rect = props.tool === RECTANGLE;
  


  //Rectangle Helper Functions--------------------------------------------
  const checkDeselectRect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleRectangleMouseDown = (event) => {
    checkDeselectRect(event);
    if (selectedId === null && props.selection==="rectangle") {
      if (newAnnotation.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
      }
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

  const handleRectangleMouseUp = (event) => {
    if (selectedId === null) {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        
        let w = x-sx;
        let h = y - sy;
        let close = false;
        let input_label = "";
        if (w !== 0 && h !== 0){
          close = true
          input_label = prompt(
            "Please enter a label for the component",
            "label"
          );
        }
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: rectangles.length + 1,
          stroke: color,
          strokeWidth: 5,
          label: input_label,
        };
        const items = rectangles.slice();
        if (close)
          items.push(annotationToAdd);
        setNewAnnotation([]);
        // setRectangles(rectangles);
        dispatch(setRectangles(items));
        console.log(rectangles);
      }
    }
  };
  //---------------------------------------------------------------


  //Line Helper Functions--------------------------------------------
  const checkDeselectLine = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectLineShape(null);
    }
  };

  const handleDragStart = (event, key) => {
    const items = lines.slice();
    const item = lines.find(i => i.key === key);
    const index = items.indexOf(item);
    items.splice(index, 1);
    items.push(item);
    dispatch(setLines(items)); 
  };

  const handleLineMouseDown = (event) => {
    //Run when we start drawing
    // drawing = true;
    checkDeselectLine(event);
    if(selectedLineId === null && props.selection==="pencil"){
      if (newLine.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        const points = [x, y];
        setNewLine([
          { points, closed: false, key: "0", stroke: color, strokeWidth: 5 },
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

  const handleLineMouseUp = (event) => {
    // drawing = false;

    if (newLine.length === 1) {
      const fx = newLine[0].points[0];
      const fy = newLine[0].points[1];
      const { x, y } = event.target.getStage().getPointerPosition();
      const dist = Math.sqrt(Math.pow(fx - x, 2) + Math.pow(fy - y, 2));
      let close = false;
      if (dist < 10) {
        if(newLine[0].points.length > 4)
          close = true;
      }
      const items = lines.slice();
      if (close) {
        let input_label = prompt(
          "Please enter a label for the component",
          "label"
        );
        newLine[0].points.push(x);
        newLine[0].points.push(y);
        const newToAdd = {
          points: newLine[0].points,
          label: input_label,
          closed: close,
          stroke: fillColor,
          fill: fillColor,
          key: lines.length + 1,
        };
        items.push(newToAdd);
      }

      setNewLine([]);
      dispatch(setLines(items));
    }
  };
  // console.log(lines)
  //---------------------------------------------------------------
  


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
      width={500}
      height={500}
    >
      <Layer>
        {props.tool === RECTANGLE && annotationsToDraw.map((value, i) => {
          return (
            <Rectangle
              key={value.key}
              shapeProps={value}
              isSelected={value.key === selectedId}
              onSelect={() => {
                selectShape(value.key);
                if(props.selection==="eraser"){
                  const items = rectangles.slice();
                  const item = rectangles.find(i => i.key === value.key);
                  const index = items.indexOf(item);
                  items.splice(index, 1);
                  // setRectangles(items);
                  dispatch(setRectangles(items));
                  return;
                }
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                dispatch(setRectangles(rects));
                // setRectangles(rects);
              }}
            />
          );
        })}
        {props.tool === LINE && lineToDraw.map((line,i) => (
          <LineComponent
            onSelect={() => {
              selectLineShape(line.key);
              if(props.selection==="eraser"){
                const items = lines.slice();
                const item = lines.find(i => i.key === line.key);
                const index = items.indexOf(item);
                items.splice(index, 1);
                dispatch(setLines(items));
                return;
              }
            }}
            key={line.key}
            keyValue={line.key}
            points={line.points}
            stroke={line.stroke}
            fill={line.fill}
            closed={line.closed}
            strokeWidth={3}
            onDragStart = {handleDragStart}
            isSelected={line.key === selectedLineId}
            onChange={(newAttrs) => {
              const line = rectangles.slice();
              line[i] = newAttrs;
              dispatch(setLines(line));
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
