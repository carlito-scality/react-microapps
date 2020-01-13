import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { property } from "lodash";
import setPublicPath from "./set-public-path.js";
import root from "./root.component.js";

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

export const bootstrap = [
  /*() => {
    return setPublicPath()
  },*/
  reactLifecycles.bootstrap
];

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
