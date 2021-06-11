import React, { useState } from "react";
import styles from "./RectangleCanvasModal.module.css";
import Canvas, { RECTANGLE } from "../Canvas/Canvas.js";
import img1 from "../../Assets/first.png";
import img3 from "../../Assets/third.png";

export default function RectangleCanvasModal(props) {
  const [color, setColor] = useState("#000000");
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={img1} alt="img" />
        <img src={img3} alt="img" />
      </div>
      <Canvas tool={RECTANGLE} color={color} />
      <div className={styles.sideBar}>
        <div>
          <label for="colorPicker">Stroke Colour : </label>
          <input
            type="color"
            value={color}
            id="colorPicker"
            onChange={(e) => setColor(e.target.value)}
          />
          <div className={styles.Button} onClick={props.isDone}>Done</div>
        </div>
      </div>
    </div>
  );
}
