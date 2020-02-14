import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Navbar } from "@scality/core-ui";
import * as isActive from "./activityFns.js";
import { Router, Link, Route, Switch } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import configureStore from "./reducer";
import { useRouteMatch, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { ExternalComponent, corsImport } from "webpack-external-import";

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
    link: "/people",
    url: "http://localhost:8236"
  },
  {
    name: "planets",
    link: "/planets",
    url: "http://localhost:8237"
  },
  {
    name: "metalk8s",
    link: "/metalk8s",
    url: "http://localhost:8240"
  }
];

Promise.all(
  availableApps.map(app =>
    corsImport(`${app.url}/importManifest.js?${Date.now()}`)
  )
).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App availableApps={availableApps} store={store}></App>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});

const Microapp = props => {
  return (
    <ExternalComponent
      interleave={__webpack_require__.interleaved(
        `${props.app.name}/Root${props.app.name}`
      )}
      store={props.store}
    />
  );
};

const App = props => {
  const history = useHistory();
  const user = useSelector(state => state.shell.user);
  const [routes, setRoutes] = useState([]);

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
      <div id="content">
        <div>
          <ExternalComponent
            interleave={__webpack_require__.interleaved("metalk8s/Toto")}
          />
        </div>

        <Switch>
          {availableApps.map(app => (
            <Route
              exact
              path={app.link}
              component={() => <Microapp app={app} store={props.store} />}
            />
          ))}
        </Switch>
      </div>
    </>
  );
};
