import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Planet from "./planets.component";
import { Provider } from "react-redux";

export default function Root(props) {
  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <Route path="/planets" component={Planet} />
      </BrowserRouter>
    </Provider>
  );
}
