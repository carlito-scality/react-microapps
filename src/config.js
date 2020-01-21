import * as singleSpa from "single-spa";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Navbar } from "@scality/core-ui";
import * as isActive from "./activityFns.js";
import { Router, Link } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import configureStore from "./reducer";
import { useRouteMatch, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers();
export const store = configureStore(enhancer);

//Auth with Dex

//Fetch available Apps => return
const availableApps = [
  {
    name: "people",
    path: "http://localhost:8236/people.js",
    link: "/people"
  },
  {
    name: "planets",
    path: "http://localhost:8237/planets.js",
    link: "/planets"
  }
];

const metalK8s = {
  name: "metalK8s",
  path: "",
  link: "/metalK8s",
  url: "http://localhost:8240"
};
//Fetch MetalK8s manifest.json
fetch(`${metalK8s.url}/manifest.json`)
  .then(response => response.json())
  .then(json => {
    metalK8s.path = `${metalK8s.url}/${json["metalK8s.js"]}`;
    availableApps.push(metalK8s);

    ReactDOM.render(
      <Provider store={store}>
        <Router history={history}>
          <App availableApps={availableApps} />
        </Router>
      </Provider>,

      document.getElementById("root")
    );

    availableApps.forEach(app =>
      singleSpa.registerApplication(
        app.name,
        () => SystemJS.import(app.path),
        isActive[app.name],
        { store }
      )
    );

    singleSpa.start();
  });

const App = props => {
  const history = useHistory();
  const user = useSelector(state => state.shell.user);
  const rightActions = [
    {
      type: "dropdown",
      text: user,
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

  const availableAppTabs = props.availableApps.map(app => {
    return {
      link: (
        <Link key={app.link} to={app.link}>
          {app.name}
        </Link>
      ),
      selected: useRouteMatch({
        path: app.link,
        exact: false,
        strict: true
      })
    };
  });

  return (
    <>
      <Navbar
        productName="Scality"
        rightActions={rightActions}
        tabs={availableAppTabs}
      />
      <div id="content"></div>
    </>
  );
};
