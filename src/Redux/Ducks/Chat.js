const ADD_USER_CHAT = "add_user_chat";
const ADD_BOT_CHAT = "add_bot_chat";
export const BOT = "bot";
export const STEP = "step";
export const USER = "user";

const initState = [];

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
      if (action.data.hasImage) {
        return [
          ...state,
          {
            sender: action.data.sender,
            hasImage: action.data.hasImage,
            images: action.data.images,
          },
        ];
      } else {
        return [
          ...state,
          {
            sender: action.data.sender,
            hasImage: action.data.hasImage,
            message: action.data.message,
          },
        ];
      }
    default:
      return state;
  }
};

export default Chat;