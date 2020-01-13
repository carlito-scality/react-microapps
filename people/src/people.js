import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { property } from "lodash";
import setPublicPath from "./set-public-path.js";
import root from "./root.component.js";
import peopleReducer from "./people.reducer";

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: root,
  //loadRootComponent: () =>
  //  import(/* webpackChunkName: "people-app" */ "./root.component.js").then(
  //    property("default")
  //  ),
  domElementGetter
});

export function bootstrap(props) {
  const store = props.store;
  store.injectReducer("people", peopleReducer); //inject Reducer dynamically
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  return reactLifecycles.mount(props);
}

export const unmount = [reactLifecycles.unmount];

export const unload = [reactLifecycles.unload];

function domElementGetter() {
  let el = document.getElementById("people");
  if (!el) {
    el = document.createElement("div");
    el.id = "people";
    const contentDiv = document.getElementById("content");
    if (contentDiv) {
      contentDiv.appendChild(el);
    } else {
      document.body.appendChild(el);
    }
  }

  return el;
}
