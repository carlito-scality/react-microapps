import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PeopleList from "./people-list/people-list.component.js";
import { getPeople } from "./utils/api";
import { updatePeopleAction } from "./people.reducer";

const People = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    getPeople(1).subscribe(
      results => {
        dispatch(updatePeopleAction(results.results));
      },
      err => {
        console.log("err", err);
      }
    );
  }, []);

  const people = useSelector(state => state.people.list);
  const user = useSelector(state => state.shell.user);
  const planets = useSelector(state => state.planets);
  return (
    <>
      <div style={{ padding: "10px 30px" }}>
        <label>Hello {user}</label>
      </div>
      {planets && (
        <div style={{ padding: "10px 30px" }}>
          <label>Planets: {planets.list.length}</label>
        </div>
      )}
      <PeopleList
        people={people}
        loadingPeople={false}
        selectPerson={people[0]}
      />
    </>
  );
};

export default People;
