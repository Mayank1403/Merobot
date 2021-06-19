import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import Rectangle from "./Rectangle";
import LineComponent from "./Line";

export const RECTANGLE = "rect";
export const LINE = "line";

const Canvas = (props) => {
  const trial = [
    {
      height: 97,
      key: 1,
      stroke: "#b82828",
      strokeWidth: 5,
      width: 166,
      x: 158.046875,
      y: 145.453125
    },
    {
      height: 71,
      key: 2,
      stroke: "#a728b8",
      strokeWidth: 5,
      width: 65,
      x: 314.046875,
      y: 185.453125
    },
    {
      height: 19,
      key: 3,
      stroke: "#4828b8",
      strokeWidth: 5,
      width: 62,
      x: 107.046875,
      y: 203.453125
    },
    {
      height: 77,
      key: 4,
      stroke: "#28b867",
      strokeWidth: 5,
      width: 26,
      x: 178.046875,
      y: 234.453125
    }
  ]
  const [rectangles, setRectangles] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [selectedLineId, selectLineShape] = useState(null);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState([]);

  const color = props.color;
  const fillColor = props.fillColor;
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };
  const rect = props.tool === RECTANGLE;
  useEffect(() => {
    if(rect)
      setRectangles(trial);
  }, []);
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
    setLines(items); 
  }

  const handleRectangleMouseDown = (event) => {
    checkDeselect(event);
    if (selectedId === null && props.selection==="rectangle") {
      if (newAnnotation.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    }
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
        if(newLine[0].points.length > 4)
          close = true;
      }

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
        {annotationsToDraw.map((value, i) => {
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
                  setRectangles(items);
                  return;
                }
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
        {lineToDraw.map((line,i) => (
          <LineComponent
            onSelect={() => {
              selectLineShape(line.key);
              if(props.selection==="eraser"){
                const items = lines.slice();
                const item = lines.find(i => i.key === line.key);
                const index = items.indexOf(item);
                items.splice(index, 1);
                setLines(items);
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
              setLines(line);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
