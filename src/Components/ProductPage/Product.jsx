import React, { useState } from "react";
import styles from "./Product.module.css";
import { TextField } from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
// import { createFilterOptions } from "@material-ui/lab/Autocomplete";

import Chat from "./Chat/Chat";
import { useDispatch } from "react-redux";
import { USER, addUserChat, BOT, addBotChat } from "../../Redux/Ducks/Chat";
import { setRectangles } from "../../Redux/Ducks/Rectangles";
import { setLines } from "../../Redux/Ducks/Lines";

import axios from "axios";

export default function Product() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  //delete this later on
  // const body_parts = [
  //   "add left-horn",
  //   "add right-horn",
  //   "add tail",
  //   "add left-leg",
  //   "add right-leg",
  // ];
  const [bodyParts, setBodyParts] = useState([]);
  const [object, setObject] = useState("");
  const [processList, setProcessList] = useState([]);
  const [process, setProcess] = useState("");
  const [modal, getModal] = useState("");
  const [sendModal, setModal] = useState("");

  const handleSetObjectApiCall = () => {
    setObject(text);
    dispatch(addUserChat(USER, text));
    axios
      .get(`http://127.0.0.1:5000/images/${text}`)
      .then((res) => {
        setText("");
        const data = {
          sender: BOT,
          hasImage: true,
          images: res.data.images,
        };
        setProcessList(res.data.process);
        dispatch(addBotChat(data));
      })
      .catch((err) => console.log(err));
  };

  const handleSetProcess = () => {
    setProcess(text);
    if (text === "") {
      alert("Invalid Input");
    } else {
      dispatch(addUserChat(USER, text));
      axios.get(`http://127.0.0.1:5000/open/${text}`).then((res) => {
        setBodyParts(res.data.parts);
        getModal(res.data.model);
      });
    }
    setText("");
  };

  const handleSetBodyPart = () => {
    if (text === "") {
      alert("Invalid Input");
    } else {
      dispatch(addUserChat(USER, text));
      setModal(modal);
      setProcess("");
    }
    setText("");
  };

  return (
    <div className={styles.Container}>
      <div className={styles.chatScreen}>
        <Chat model={sendModal} />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputField}>
          {object === "" ? (
            <TextField
              id="outlined-basic"
              label="Enter Text"
              variant="outlined"
              fullWidth
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          ) : (
            <Autocomplete
              id="combo-box-demo"
              options={process === "" ? processList : bodyParts}
              value={text}
              getOptionLabel={(option) => option}
              autoHighlight
              freeSolo
              clearOnEscape
              onChange={(e, value) => setText(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter Text"
                  id="outlined-basic"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          )}
        </div>
        <div
          className={styles.sendButton}
          onClick={
            object === ""
              ? handleSetObjectApiCall
              : process === ""
              ? handleSetProcess
              : handleSetBodyPart
          }
        >
          Send
        </div>
      </div>
    </div>
  );
}
