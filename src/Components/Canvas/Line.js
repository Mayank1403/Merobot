import React from "react";
import {Line} from "react-konva";

const LineComponent = (props) => {
  return (
    <Line
      key={props.keyValue}
      points={props.points}
      stroke={props.stroke}
      closed={props.closed}
      fill={props.fill}
      strokeWidth={props.strokeWidth}
    />
  );
};

export default LineComponent;
