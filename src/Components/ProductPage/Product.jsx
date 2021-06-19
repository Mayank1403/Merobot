import React, { useState } from "react";
import styles from "./Product.module.css";
import { TextField } from "@material-ui/core";

import {Autocomplete} from "@material-ui/lab";
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

import Chat from "./Chat/Chat";
import { useDispatch } from "react-redux";
import { USER, addChat } from "../../Redux/Ducks/Chat";

export default function Product() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();


  //delete this later on
  const body_parts = ["add left-horn", "add right-horn", "add tail", "add left-leg", "add right-leg"];
  const [show, setShow] = useState(false);
  const [matched, setMatched] = useState([]);
  // const manageSuggestion = (text)=>{
  //   if(!text.toLowerCase().includes("add")){
  //     setText(text);
  //     return;
  //   }
  //   const copy = text;
  //   text = text.replace('add ', '');
  //   let match = body_parts.filter((part)=>{
  //     const regex = new RegExp(`${text}`, "gi");
  //     return part.match(regex);
  //   });
  //   console.log(copy==="add");
  //   if(match.length===0 && copy.toLowerCase()!=="add"){
  //     alert("Chose from : "+body_parts);
  //     setText("add ");
  //     setShow(false);
  //     return;
  //   }
  //   if(copy.toLowerCase()==="add"){
  //     setText(copy);
  //     return;
  //   }
  //   setText('add '+text);
  //   setMatched(match);
  //   setShow(true);
  // }
  //remove till here

  const handleClick = () => {
    dispatch(addChat(USER, text));
    setText("");
    setMatched("");
    setShow(false);
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',

  });
  

  return (
    <div className={styles.Container}>
      <div className={styles.chatScreen}>
        <Chat />
      </div>
      <div className={styles.inputContainer}>
        {/* <div className={styles.suggestion}>
          {show && 
            <div className="showOptions">
              {matched.map((body_part, index)=>(
                <div key={index}>{body_part}</div>
              ))}
            </div>
          }
        </div> */}
        <div className={styles.inputField}>
          {/* <TextField
            id="outlined-basic"
            label="Enter Text"
            variant="outlined"
            fullWidth
            onChange={(e) => manageSuggestion(e.target.value)}
            value={text}
          /> */}
          <Autocomplete
            // defaultValue={text}
            id="combo-box-demo"
            options={body_parts}
            getOptionLabel={(option) => option}
            filterOptions={filterOptions}
            // style={{ width: 300 }}
            autoHighlight
            freeSolo
            clearOnEscape
            onChange={(e, value) => setText(value)}
            renderInput={(params) => <TextField 
              {...params} 
              label="Enter Text" 
              id="outlined-basic" 
              fullWidth 
              variant="outlined"
            />}
          />
        </div>
        <div className={styles.sendButton} onClick={handleClick}>
          Send
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div className={styles.Container}>
//       <div className={styles.chatScreen}>
//         <Chat />
//       </div>
//       <div className={styles.inputContainer}>
//         {show && 
//           <div className="showOptions">
//             {body_parts.map((body_part, index)=>(
//               <div key={index}>{body_part}</div>
//             ))}
//           </div>
//         }
//         <div className={styles.inputField}>
//           <TextField
//             id="outlined-basic"
//             label="Enter Text"
//             variant="outlined"
//             fullWidth
//             onChange={(e) => setText(e.target.value)}
//             value={text}
//           />
//         </div>
//         <div className={styles.sendButton} onClick={handleClick}>
//           Send
//         </div>
//       </div>
//     </div>
//   );
// }
