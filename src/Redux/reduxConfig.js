import { createStore, combineReducers } from "redux";
import Chat from "./Ducks/Chat";
import Rectangles from "./Ducks/Rectangles";
import Lines from "./Ducks/Lines";
import Images from "./Ducks/Images";
import serverdataReducer from "./Ducks/Serverdata";

const allReducers = combineReducers({
  Chat,
  Rectangles,
  Lines,
  Images,
  serverdata: serverdataReducer
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
