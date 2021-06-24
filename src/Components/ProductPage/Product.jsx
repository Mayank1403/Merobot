import React, { useState } from "react";
import styles from "./Product.module.css";
import { TextField } from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
// import { createFilterOptions } from "@material-ui/lab/Autocomplete";

import Chat from "./Chat/Chat";
import { useDispatch } from "react-redux";
import { USER, addUserChat, BOT, addBotChat } from "../../Redux/Ducks/Chat";

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
  const [process, setProcess] = useState(false);

  const handleApiCall = () => {
    console.log(object);
    axios
      .get(`http://127.0.0.1:5000/images/${text}`)
      .then((res) => {
        console.log(res);
        const data = {
          sender: BOT,
          hasImage: true,
          images: res.data.images,
        };
        dispatch(addBotChat(data));
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    dispatch(addUserChat(USER, text));
    if(process===true){
      //do the first api call here
      axios
        .get(`http://127.0.0.1:5000/open/${text}`)
        .then((res) => {
          console.log(res);
          setBodyParts(res.data.parts);
        });
      setProcess(false);
    }
    else{
      setProcess(true);
    }
    setText("");
  };


  // const filterOptions = createFilterOptions({
  //   matchFrom: "any",
  // });

  return (
    <div className={styles.Container}>
      <div className={styles.chatScreen}>
        <Chat />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputField}>
          {(object === "" || process) ? (
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
              // defaultValue={text}
              id="combo-box-demo"
              options={bodyParts}
              getOptionLabel={(option) => option}
              // filterOptions={filterOptions}
              // style={{ width: 300 }}
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
              ? (e) => {
                  handleClick()
                  setObject(text);
                  setProcess(true);
                  handleApiCall();
                }
              : handleClick
          }
        >
          Send
        </div>
      </div>
    </div>
  );
}