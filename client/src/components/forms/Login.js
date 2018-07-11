import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div className="columns CST_fullHeight is-vcentered is-centered">
        <div className="column is-8-desktop is-10-tablet">
          <form className="CST_frame">
            <h1 className="title is-1 has-text-centered CST_titleThrough">
              Login
            </h1>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Text input" />
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-success"
                  type="text"
                  placeholder="Text input"
                  value="bulma"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check" />
                </span>
              </div>
              <p className="help is-success">This username is available</p>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-danger"
                  type="email"
                  placeholder="Email input"
                  value="hello@"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle" />
                </span>
              </div>
              <p className="help is-danger">This email is invalid</p>
            </div>

            <div className="buttons CST_is-opposed">
              <span className="button is-success">Sign up</span>
              <span className="button is-info">Return home</span>
            </div>

            <p className="has-text-centered">
              Doesn't have an account? <br />
              <a href="/register"> Register now!</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
