import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlanetList from "./planet-list/planet-list.component.js";
import { getPlanets } from "./utils/api";
import { updatePlanetsAction } from "./planets.reducer";

const Planets = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    getPlanets(1).subscribe(
      results => {
        dispatch(updatePlanetsAction(results.results));
      },
      err => {
        console.log("err", err);
      }
    );
  }, []);

  const planets = useSelector(state => state.planets.list);
  return <PlanetList loading={false} planets={planets} />;
};

export default Planets;
