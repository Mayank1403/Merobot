import { createStore, combineReducers } from "redux";
import Chat from "./Ducks/Chat";

const allReducers = combineReducers({
  Chat,
});

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
