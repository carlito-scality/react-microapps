import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import peopleReducer from "./people.reducer";
import People from "./people.component";

export default function Root(props) {
  useEffect(() => {
    props.store.injectReducer("people", peopleReducer); //inject Reducer dynamically
  }, []);
  const people = useSelector(state => state.people);
  return people ? <People /> : null; //should wait for redux state to be created before rendrering
}
