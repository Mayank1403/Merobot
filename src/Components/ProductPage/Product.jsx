import React, { useState } from "react";
import styles from "./Product.module.css";
import { TextField } from "@material-ui/core";
import Chat from "./Chat/Chat";
import { useDispatch } from "react-redux";
import { USER, addChat } from "../../Redux/Ducks/Chat";

export default function Product() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addChat(USER, text));
    setText("");
  };

  return (
    <div className={styles.Container}>
      <div className={styles.chatScreen}>
        <Chat />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputField}>
          <TextField
            id="outlined-basic"
            label="Enter Text"
            variant="outlined"
            fullWidth
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <div className={styles.sendButton} onClick={handleClick}>
          Send
        </div>
      </div>
    </div>
  );
}
