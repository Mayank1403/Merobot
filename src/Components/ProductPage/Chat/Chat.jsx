import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addUserChat, BOT, STEP, USER } from "../../../Redux/Ducks/Chat";
import RectangleCanvasModal from "../../RectangleCanvasModal/RectangleCanvasModal";
import LineCanvasModal from "../../LineCanvasModal/LineCanvasModal";


const Chat = ({model}) => {
  const Data = useSelector((state) => state.Chat);
  const RectangleData = useSelector((state) => state.Rectangles)
  const LinesData = useSelector((state) => state.Lines)
  const chatRef = useRef(null);
  const dispatch = useDispatch();

  const [openModel, setModel] = useState("");
  useEffect(() => {
    setModel(model)
  }, [model])

  const handleModalClose = (model) => {
    dispatch(addUserChat(STEP, "Changes"));
    if(model === "rectangle"){
      axios.post('http://127.0.0.1:5000/update', RectangleData);
    }
    else{
      axios.post('http://127.0.0.1:5000/add', LinesData);//aaltu faltu kaam karta hai
    }
    
    setModel("");
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  });

  return (
    <div className={styles.Container} ref={chatRef}>
      {Data.map((info, idx) =>
        info.sender === BOT ? (
          <div className={styles.leftMessage} key={idx}>
            <div className={styles.image}>M</div>
            <div className={styles.leftText}>
              {info.hasImage ? (
                <div className={styles.imageDiv}>
                  {info.images.map((data, idx) => (
                    <img
                      src={data}
                      alt="produced images"
                      key={idx}
                    />
                  ))}
                </div>
              ) : (
                info.message
              )}
            </div>
          </div>
        ) : info.sender === USER ? (
          <div className={styles.rightMessageContainer} key={idx}>
            <div className={styles.rightMessage}>
              <div className={styles.rightText}>{info.message}</div>
              <div className={styles.image}>U</div>
            </div>
          </div>
        ) : (
          <div className={styles.step}>*** {info.message} ***</div>
        )
      )}
      {openModel !== "" ? (
        openModel === "rect" ? (
          <RectangleCanvasModal isDone={handleModalClose} />
        ) : (
          <div>
            <LineCanvasModal isDone={handleModalClose} />
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default Chat
