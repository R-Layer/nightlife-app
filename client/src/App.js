import React, { Component } from "react";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import "./css/App.css";
import "./css/customBulma.css";

import { rootReducer } from "./redux/reducers/rootReducer";

//import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import WindowPage from "./components/WindowPage";
//import EditUser from "./components/forms/EditUser";

import { loginProcess, reservationProcess } from "./redux/types";
import jwt_decode from "jwt-decode";

/* const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
); */
const store = createStore(rootReducer, applyMiddleware(thunk));
if (localStorage.authToken) {
  store.dispatch({
    type: loginProcess.SUCCESS,
    loggedUser: { token: localStorage.authToken }
  });
  const { exp } = jwt_decode(localStorage.authToken);
  if (exp > Date.now()) {
    store.dispatch({ type: loginProcess.LOGOUT });
  }
}

if (localStorage.reserveStatus) {
  store.dispatch({
    type: reservationProcess.SUCCESS,
    result: localStorage.reserveStatus
  });
}
class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <Route exact path={"/"} component={WindowPage} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/register"} component={Register} />
            {/*             <Switch>
              <PrivateRoute exact path={"/settings"} component={EditUser} />
            </Switch> */}
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
