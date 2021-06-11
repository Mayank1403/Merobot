import img1 from '../../Assets/first.png'
import img2 from '../../Assets/second.png'
import img3 from '../../Assets/third.png'

const ADD = "add";
export const BOT ='bot'
export const STEP = 'step'
export const USER = 'user'

const initState = [
  {
    sender: BOT,
    hasImage : true,
    image : [
      {
        src : img1,
        model : ""
      },
      {
        src : img2,
        model : "rect"
      },
      {
        src : img3,
        model : "line"
      }
    ]
  }
];

export const addChat = (sender, message) => {
  return {
    type: ADD,
    sender,
    message,
  };
};

const Chat = (state = initState, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          sender: action.sender,
          message: action.message,
        },
      ];
    default:
      return state;
  }
};

export default Chat;
