import { combineReducers } from "redux";
import config from "./config.reducer";
import people from "../people/src/people.reducer";
import planets from "../planets/src/planets.reducer";

const rootReducer = combineReducers({
  shell: config,
  people,
  planets
});

export default rootReducer;
