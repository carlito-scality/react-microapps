import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PeopleList from "./people-list/people-list.component.js";
import { getPeople } from "./utils/api";
import { updatePeopleAction } from "./people.reducer";

const People = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      updatePeopleAction([{ name: "Toto" }, { name: "Titi" }, { name: "Tata" }])
    );
  }, []);

  const user = useSelector(state => state.shell.user);
  const list = useSelector(state => (state.people && state.people.list) || []);
  return (
    <>
      <span>Hi {user}, Here is a people list</span>
      <ul>
        {list.map((p, i) => (
          <li key={`item${i}`}>{p.name}</li>
        ))}
      </ul>
    </>
  );
};

export default People;
