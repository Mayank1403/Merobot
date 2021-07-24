import { createStore, combineReducers } from "redux";
import Chat from "./Ducks/Chat";
import Rectangles from "./Ducks/Rectangles";
import Lines from "./Ducks/Lines";

const allReducers = combineReducers({
  Chat,
  Rectangles,
  Lines,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
