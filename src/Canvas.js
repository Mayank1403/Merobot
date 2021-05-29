import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Rectangle from "./Rectangle";

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

const Canvas = () => {
  const [rectangles, setRectangles] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleMouseDown = (event) => {
    checkDeselect(event);
    if (selectedId === null) {
      if (newAnnotation.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    }
  };

  const handleMouseUp = (event) => {
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
          stroke: "red",
          strokeWidth: 3,
        };
        if (annotationToAdd.width !== 0 && annotationToAdd.height !== 0)
          rectangles.push(annotationToAdd);
        setNewAnnotation([]);
        setRectangles(rectangles);
      }
    }
  };

  const handleMouseMove = (event) => {
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
            stroke: "red",
            strokeWidth: 3,
          },
        ]);
      }
    }
  };

  const annotationsToDraw = [...rectangles, ...newAnnotation];
  return (
    <Stage
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={900}
      height={700}
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
      </Layer>
    </Stage>
  );
};

export default Canvas;
