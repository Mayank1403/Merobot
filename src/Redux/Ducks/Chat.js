import img1 from "../../Assets/first.png";
import img2 from "../../Assets/second.png";
import img3 from "../../Assets/third.png";

const ADD_USER_CHAT = "add_user_chat";
const ADD_BOT_CHAT = "add_bot_chat";
export const BOT = "bot";
export const STEP = "step";
export const USER = "user";

const initState = [
  // {
  //   sender: BOT,
  //   hasImage : true,
  //   images : [
  //     {
  //       src : img1,
  //       model : ""
  //     },
  //     {
  //       src : img2,
  //       model : "rect"
  //     },
  //     {
  //       src : img3,
  //       model : "line"
  //     }
  //   ]
  // }
];

export const addUserChat = (sender, message) => {
  return {
    type: ADD_USER_CHAT,
    sender,
    message,
  };
};

export const addBotChat = (data) => {
  return {
    type: ADD_BOT_CHAT,
    data,
  };
};

const Chat = (state = initState, action) => {
  switch (action.type) {
    case ADD_USER_CHAT:
      return [
        ...state,
        {
          sender: action.sender,
          message: action.message,
        },
      ];
    case ADD_BOT_CHAT:
      return [
        ...state,
        {
          sender: action.data.sender,
          hasImage: action.data.hasImage,
          images: action.data.images,
        },
      ];
    default:
      return state;
  }
};

export default Chat;
