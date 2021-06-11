import React, { useRef, useEffect } from "react";
import { Line,Transformer } from "react-konva";

const LineComponent = (props) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (props.isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [props.isSelected]);

  return (
    <React.Fragment>
      <Line
        key={props.keyValue}
        points={props.points}
        stroke={props.stroke}
        closed={props.closed}
        fill={props.fill}
        strokeWidth={props.strokeWidth}
        draggable={props.isSelected ? true : false}
        onClick={props.onSelect}
        onTap={props.onSelect}
        ref={shapeRef}
      />
      {props.isSelected && (
        <Transformer
          ref={trRef}
          ignoreStroke={true}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default LineComponent;
