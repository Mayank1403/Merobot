import React, { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addChat, BOT, STEP, USER } from "../../../Redux/Ducks/Chat";
import RectangleCanvasModal from "../../RectangleCanvasModal/RectangleCanvasModal";
import LineCanvasModal from "../../LineCanvasModal/LineCanvasModal";

export default function Chat() {
  const Data = useSelector((state) => state.Chat);
  const chatRef = useRef(null);
  const dispatch = useDispatch();

  const [model, setModel] = useState("");

  const handleModalClose = () => {
    dispatch(addChat(STEP, "Changes"));
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
                  {info.image.map((data, idx) => (
                    <img
                      src={data.src}
                      alt="produced images"
                      onClick={() => setModel(data.model)}
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
      {model !== "" ? (
        model === "rect" ? (
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
