import Images from "./Images";
import Canvas from './Canvas';
import { useState } from "react";
import Sidebar from "./Sidebar";

const Modal = ({images, tool, closeModal}) => {
    const [color, setColor] = useState("#000");
    const [fillColor, setFillColor] = useState("#000");

    const changeColor = (event) => {
        setColor(event.target.value);
    }

    const changeFillColor = (event) => {
        setFillColor(event.target.value);
    }

    return (
        <div className = "modal">
            <div className = "modal__images">
                <Images images = {images}/>
            </div>
            <div className = "modal__content canvas">
                <div className = "modal__body">
                    <Canvas tool={tool} color={color} fillColor={fillColor}/>
                </div>
                <div className = "modal__form">
                    <Sidebar color={color} fillColor={fillColor} changeColor={changeColor} changeFillColor={changeFillColor} closeModal={closeModal}/>
                </div>
            </div>
        </div>
    );
}

export default Modal;