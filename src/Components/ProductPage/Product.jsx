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
    setModal("");
    setProcess(text);
    if (text === "") {
      alert("Invalid Input");
    } else {
      dispatch(addUserChat(USER, text));
      dispatch(
        addBotChat({
          sender: BOT,
          hasImage: false,
          message: `What do you want to ${text}`,
        })
      );
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
      axios
        .get(`http://127.0.0.1:5000/process/${process}`)
        .then((res) => {
          if (process.toLowerCase() === "update") {
            dispatch(setRectangles(res.data.lists));
          } else if (
            process.toLowerCase() === "add" ||
            process.toLowerCase() === "remove"
          )
            dispatch(setLines(res.data.lists));
          setModal(modal);
        })
        .catch((err) => console.log(err));
      dispatch(addUserChat(USER, text));
      setProcess("");
    }
    setText("");
  };

  const checkDisable = () => {
    if(object==="")
      return false;
    if(bodyParts.includes(text) || processList.includes(text))
      return false;
    return true;
  }

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
        <button
          className={styles.sendButton}
          disabled={checkDisable()}
          onClick={
            object === ""
              ? handleSetObjectApiCall
              : process === ""
              ? handleSetProcess
              : handleSetBodyPart
          }
        >
          Send
        </button>
      </div>
    </div>
  );
}
