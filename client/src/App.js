import React, { Component } from "react";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./css/App.css";
import "./css/customBulma.css";

import { rootReducer } from "./reducers/rootReducer";

import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./components/LandingPage";
import LandingPrivate from "./components/LandingPrivate";

class App extends Component {
  render() {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const author = { isAuthenticated: true };
    return (
      <Router>
        <Provider store={store}>
          <div>
            <Route exact path={"/"} component={LandingPage} />
            <Switch>
              <PrivateRoute
                exact
                path={"/private"}
                auth={author}
                component={LandingPrivate}
              />
            </Switch>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
