import React, { useState } from "react";
import styles from "./LineCanvasModal.module.css";
import Canvas, { RECTANGLE, LINE } from "../Canvas/Canvas.js";
import img1 from "../../Assets/first.png";
import img2 from "../../Assets/second.png";

export default function RectangleCanvasModal(props) {
  const [color, setColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#FeB142");
  //delete
  const [selection, setSelection] = useState('pencil');
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={img1} alt="img" />
        <img src={img2} alt="img" />
      </div>
      <Canvas tool={LINE} selection={selection} color={color} fillColor={fillColor}/>
      <div className={styles.sideBar}>
        <div>
          <div className={styles.input}>
            <select
              value = {selection}
              onChange = {e=>setSelection(e.target.value)}
            >
              <option value = "pencil">Pencil</option>
              <option value = "eraser">Eraser</option>
            </select>
          </div>
          <div className={styles.input}>
            <input
              type="color"
              value={color}
              id="strokePicker"
              onChange={(e) => setColor(e.target.value)}
            />
            <label for="strokePicker"> Stroke Colour</label>

          </div>
          <div className={styles.input}>
            <input
              type="color"
              value={fillColor}
              id="fillPicker"
              onChange={(e) => setFillColor(e.target.value)}
            />
            <label for="fillPicker"> Fill Colour</label>
          </div>
          <div className={styles.Button} onClick={props.isDone}>
            Done
          </div>
        </div>
      </div>
    </div>
  );
}
