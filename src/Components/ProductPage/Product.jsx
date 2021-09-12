import React, { useState } from "react";
import styles from "./Product.module.css";
import { TextField } from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
// import { createFilterOptions } from "@material-ui/lab/Autocomplete";

import Loader from "../Loader/Loader";

import Chat from "./Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { USER, addUserChat, BOT, addBotChat } from "../../Redux/Ducks/Chat";
import { setRectangles } from "../../Redux/Ducks/Rectangles";
import { setLines } from "../../Redux/Ducks/Lines";
import { setReduxProcess, setReduxAddPart } from "../../Redux/Ducks/Images";

import axios from "axios";
import { storeImages } from "../../Redux/Ducks/Images";
import { getServerdata } from "../../Redux/Ducks/Serverdata";

export default function Product() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [bodyParts, setBodyParts] = useState([]);
  const [object, setObject] = useState("");
  const [processList, setProcessList] = useState([]);
  const [process, setProcess] = useState("");
  const [modal, getModal] = useState("");
  const [sendModal, setModal] = useState("");
  const [loader, setLoader] = useState(false);
  const serverData = useSelector((state) => state.serverdata);

  const handleSetObjectApiCall = () => {
    setObject(text);
    setLoader(true);
    dispatch(addUserChat(USER, text));
    axios
      .get(`http://10.4.16.102:5000/images/${text}`)
      // .get(`http://96d1-14-139-82-6.ngrok.io/images/${text}`)
      .then((res) => {
        setText("");
        dispatch(storeImages(res.data.images));
        dispatch(getServerdata(res.data.data));
        const data = {
          sender: BOT,
          hasImage: true,
          images: res.data.images,
        };
        setProcessList(res.data.process);
        dispatch(addBotChat(data));
        setLoader(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSetProcess = () => {
    setModal("");
    setLoader(true);
    setProcess(text);
    dispatch(setReduxProcess(text));
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
      axios.post(`http://10.4.16.102:5000/open/${text}`,serverData).then((res) => {
        // axios.get(`http://96d1-14-139-82-6.ngrok.io/open/${text}`).then((res) => {

        setBodyParts(res.data.parts);
        getModal(res.data.model);
        setLoader(false);
      });
    }
    setText("");
  };

  const handleSetBodyPart = () => {
    if (text === "") {
      alert("Invalid Input");
    } else {
      setLoader(true);
      axios
        .post(`http://10.4.16.102:5000/process/${process}`,serverData)
        // .get(`http://96d1-14-139-82-6.ngrok.io/process/${process}`)
        .then((res) => {
          if (process.toLowerCase() === "update") {
            dispatch(setRectangles(res.data.lists));
            setLoader(false);
            setModal(modal);
          } else if (
            process.toLowerCase() === "add" ||
            process.toLowerCase() === "remove"
          ) {
            setLoader(false);
            dispatch(setLines(res.data.lists));
            setModal(modal);
          }
        })
        .catch((err) => console.log(err));
      dispatch(addUserChat(USER, text));
      dispatch(setReduxAddPart(text));
      setProcess("");
    }
    setText("");
  };

  const checkDisable = () => {
    if (object === "") return false;
    if (bodyParts.includes(text) || processList.includes(text)) return false;
    return true;
  };

  return (
    <div className={styles.Container}>
      <div className={styles.chatScreen}>
        <Chat model={sendModal} />
        {loader && <Loader />}
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
