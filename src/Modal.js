import React, {useState} from "react";
import Canvas from "./Canvas";
import Form from "./Form";

const Modal = props => {

    if(!props.show){
        return null;
    }

    return (
        <div className = "modal">
            <div className = "modal-form">
                <Form query={props.query} setQuery = {props.setQuery} tool={props.tool} setTool={props.setTool} color={props.color} changeColor = {props.changeColor}/>
            </div>
            <div className = "modal-content canvas">
                <div className = "modal-header">
                    <h4>Title</h4>
                </div>
                <div className = "modal-body">
                    <Canvas tool={props.tool} color={props.color}/>
                </div>
                <div className = "modal-footer">
                    <button onClick={props.closeModal}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;