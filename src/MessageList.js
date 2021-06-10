// import User from "./images/user.jpg";
// import Bot from "./images/bot.jpg";
import { useState } from 'react';
import Images from "./Images";
import Modal from "./Modal";

export const PENCIL = "pencil";
export const RECTANGLE = "rectangle";

const MessageList = ({text}) => {
    const isUser = "User" === text.user;

    const [tool, setTool] = useState(PENCIL);
    const [modalTrue, setModalTrue] = useState(false); //use to show modal

    const openCanvas = (id) => {
        if(id === 2){
            setTool(RECTANGLE);
        }
        else{
            setTool(PENCIL);
        }
        setModalTrue(true);
    }


    const closeModal = () => {
        setModalTrue(false);
    }

    // let image = Bot;
    // if(isUser){
    //     image = User;
    // }
    return (
        <div className = {`messagelist ${isUser ? 'messagelist__user' : 'messagelist__bot'}`}>
            {/* <img src={image} alt=""/> */}
            <h3>
                <span>
                    {text.text}
                    {(text.img.length !== 0) && 
                        <div>
                            <br/>
                            <Images images = {text.img} openCanvas = {openCanvas}/>
                        </div>
                    }
                </span>
            </h3>
            {modalTrue && <Modal images = {text.img} tool = {tool} closeModal={closeModal}/>}
        </div>
    );
}

export default MessageList;