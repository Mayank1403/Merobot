import React, { useState } from "react";
import styles from "./LineCanvasModal.module.css";
import Canvas, { LINE } from "../Canvas/Canvas.js";
import { useSelector } from "react-redux";
import { BsPencil } from "react-icons/bs";

export default function LineCanvasModal(props) {
  const lines = useSelector((state) => state.Lines.line);
  const imageStore = useSelector((state) => state.ImageStore);

  // const [color, setColor] = useState("#000000");
  const color = "#000000";
  const [fillColor, setFillColor] = useState("#FeB142");
  //delete
  const [selection, setSelection] = useState("pencil");
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={imageStore.rect_image} alt="img" className={styles.image} />
        <img
          src={imageStore.generated_image}
          alt="img"
          className={styles.image}
        />
      </div>
      <Canvas
        tool={LINE}
        selection={selection}
        color={color}
        fillColor={fillColor}
      />
      <div className={styles.sideBar}>
        <div>
          <div className={styles.input}>
            {/* <select
              value = {selection}
              onChange = {e=>setSelection(e.target.value)}
            >
              <option value = "pencil">Pencil</option>
              <option value = "eraser">Eraser</option>
            </select> */}
            <BsPencil
              onClick={(e) => setSelection("pencil")}
              className={styles.optionIcons}
            />
          </div>
          <div className={styles.input}>
            <input
              type="color"
              value={fillColor}
              id="fillPicker"
              onChange={(e) => setFillColor(e.target.value)}
            />
            <label for="fillPicker">Colour</label>
          </div>
          <table className={styles.Table}>
            <tr>
              <th>Part</th>
              <th>Color</th>
            </tr>
            {lines.map((line, index) => (
              <tr key={index}>
                <td>{line.label}</td>
                <td
                  className={styles.Td}
                  style={{ backgroundColor: line.stroke }}
                ></td>
              </tr>
            ))}
          </table>
          <div className={styles.Button} onClick={props.isDone}>
            Done
          </div>
        </div>
      </div>
    </div>
  );
}
