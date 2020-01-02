import * as singleSpa from "single-spa";
import React from "react";
import ReactDOM from "react-dom";
import { Navbar } from "@scality/core-ui";
import * as isActive from "./activityFns.js";

//Auth with Dex

//Fetch available Apps => return
const availableApps = [
  {
    name: "people",
    path: "http://localhost:8236/people.js",
    element: "people",
    link: "/people"
  },
  {
    name: "planets",
    path: "http://localhost:8237/planets.js",
    element: "planets",
    link: "/planets"
  }
];

const availableAppTabs = availableApps.map(app => {
  return {
    onClick: () => {
      window.open(app.link, "_self");
    },
    selected: location.href.indexOf(app.name) !== -1,
    title: app.name
  };
});

const rightActions = [
  {
    type: "dropdown",
    text: "Carlito",
    icon: <i className="fas fa-user" />,
    items: [
      {
        label: "Log out",
        onClick: event => {
          console.log(event);
        }
      }
    ]
  }
];

ReactDOM.render(
  <Navbar
    productName="Scality"
    rightActions={rightActions}
    tabs={availableAppTabs}
  />,
  document.getElementById("navbar")
);

availableApps.forEach(app =>
  singleSpa.registerApplication(
    app.name,
    () => SystemJS.import(app.path),
    isActive[app.name]
  )
);

singleSpa.start();
