import { createStore, combineReducers } from "redux";
import Chat from "./Ducks/Chat";
import Rectangles from "./Ducks/Rectangles";

const allReducers = combineReducers({
  Chat,
  Rectangles,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
