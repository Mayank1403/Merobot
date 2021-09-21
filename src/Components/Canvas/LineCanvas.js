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
        onDragStart = {e=>props.onDragStart(e, props.keyValue)}
        // onTransformEnd={(e) => {
        //   // transformer is changing scale of the node
        //   // and NOT its width or height
        //   // but in the store we have only width and height
        //   // to match the data better we will reset scale on transform end
        //   const node = shapeRef.current;
        //   const scaleX = node.scaleX();
        //   const scaleY = node.scaleY();

        //   // we will reset it back
        //   node.scaleX(1);
        //   node.scaleY(1);
        //   onChange({
        //     ...shapeProps,
        //     x: node.x(),
        //     y: node.y(),
        //     // set minimal value
        //     width: Math.max(5, node.width() * scaleX),
        //     height: Math.max(node.height() * scaleY),
        //   });
        // }}
      />
      {/* {props.isSelected && (
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
      )} */}
    </React.Fragment>
  );
};

export default LineComponent;
