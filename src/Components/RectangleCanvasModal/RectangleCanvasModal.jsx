import React, { useState } from "react";
import styles from "./RectangleCanvasModal.module.css";
import Canvas, { RECTANGLE } from "../Canvas/Canvas.js";
import { useSelector } from "react-redux";


export default function RectangleCanvasModal(props) {
  const rectangles = useSelector((state) => state.Rectangles.rect);
  const img1 = useSelector((state) => state.Images.img1);
  const img3 = useSelector((state) => state.Images.img3);
  const [color, setColor] = useState("#000000");
  const [selection, setSelection] = useState('rectangle');
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={img1} alt="img" />
        <img src={img3} alt="img" />
      </div>
      <Canvas tool={RECTANGLE} selection={selection} color={color} />
      <div className={styles.sideBar}>
        <div>
          <div className={styles.input}>
            <select
              value = {selection}
              onChange = {e=>setSelection(e.target.value)}
            >
              <option value = "rectangle">Rectangle</option>
              <option value = "eraser">Eraser</option>
            </select>
          </div>
          <label for="colorPicker">Stroke Colour : </label>
          <input
            type="color"
            value={color}
            id="colorPicker"
            onChange={(e) => setColor(e.target.value)}
          />
          <table className={styles.Table}>
            <tr>
              <th>Part</th>
              <th>Color</th>
            </tr>
            {rectangles.map((rectangle, index)=>(
              <tr key={index}>
                <td>{rectangle.label}</td>
                <td className={styles.Td} style={{backgroundColor: rectangle.stroke}}></td>
              </tr>
            ))}
          </table>
          <div className={styles.Button} onClick={props.isDone}>Done</div>
        </div>
      </div>
    </div>
  );
}
