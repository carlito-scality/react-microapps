import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import People from "./people.component";
import { Provider } from "react-redux";

export default function Root(props) {
  return (
    <Provider store={props.store}>
      <BrowserRouter>
        <Route path="/people" component={People} />
      </BrowserRouter>
    </Provider>
  );
}
