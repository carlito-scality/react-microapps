import { combineReducers } from "redux";
import config from "./config.reducer";

const rootReducer = combineReducers({
  shell: config
});

export default rootReducer;
