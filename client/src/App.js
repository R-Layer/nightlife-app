import React, { Component } from "react";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./css/App.css";
import "./css/customBulma.css";

import { rootReducer } from "./redux/reducers/rootReducer";

import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./components/LandingPage";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import LandingPrivate from "./components/LandingPrivate";
import { loginProcess } from "./redux/types";

const store = createStore(rootReducer, applyMiddleware(thunk));
const author = { isAuthenticated: false };
if (localStorage.authToken) {
  store.dispatch({
    type: loginProcess.SUCCESS,
    loggedUser: { token: localStorage.authToken }
  });
}
class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <Route exact path={"/"} component={LandingPage} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/register"} component={Register} />
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
