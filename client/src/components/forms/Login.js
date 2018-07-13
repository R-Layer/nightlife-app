import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginAction, logoutAction } from "../../redux/actions/userActions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.loginUser(this.state, this.props.history);
  };

  onClick = () => {
    this.props.history.push("/");
  };

  fetchYelp = () => {
    /*     let apiKey =
      "Bearer m1NoLc4IaowqFwqs5MjQXEwD66eplE66JSyIC28-yj16_7MFpRh4fPp6DsJekLiZBjz0cIMP3vuCzlSMOsr4Kv5_MVnqvipExw8rO1U6tIuR9yZs8NLblJ1CDJ1HW3Yx";

    let myInit = {
      method: "GET",
      headers: { authorization: apiKey },
      mode: "cors"
    };

    fetch(
      "https://api.yelp.com/v3/businesses/search?location=LosAngeles",
      myInit
    ).then(res => console.log(res)); */
    console.log("auth", this.props.authState);
  };

  render() {
    const { errors } = this.props;
    let spreadErr = {};
    if (errors.isJoi) {
      errors.details.map(err => {
        return spreadErr.hasOwnProperty(err.context.key)
          ? spreadErr[err.context.key].push(err.message.replace(/"/g, ""))
          : (spreadErr[err.context.key] = [err.message.replace(/"/g, "")]);
      });
    }

    return (
      <div className="CST_fullHeight ">
        {errors.message && (
          <div className="notification is-danger has-text-centered CST_frame">
            {errors.message}
          </div>
        )}
        <div
          className={`columns is-vcentered is-centered ${
            errors.message ? "" : "CST_fullHeight"
          }`}
        >
          <div className="column is-8-desktop is-10-tablet">
            <form className="CST_frame" onSubmit={this.onSubmit} noValidate>
              <h1 className="title is-1 has-text-centered CST_titleThrough">
                Login
              </h1>

              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input
                    className={spreadErr.email ? "input is-danger" : "input"}
                    type="email"
                    placeholder="Email input"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                </div>
                {spreadErr.email &&
                  spreadErr.email.map(err => (
                    <p className="help is-danger" key={err}>
                      {err}
                    </p>
                  ))}
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={spreadErr.password ? "input is-danger" : "input"}
                    type="password"
                    placeholder="Text input"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                {spreadErr.password &&
                  spreadErr.password.map(err => (
                    <p className="help is-danger" key={err}>
                      {err}
                    </p>
                  ))}
              </div>

              <div className="buttons CST_is-opposed">
                <button type="submit" className="button is-success">
                  Log in
                </button>
                <button
                  onClick={this.onClick}
                  type="button"
                  className="button is-info"
                >
                  Return home
                </button>
              </div>

              <p className="has-text-centered">
                Doesn't have an account? <br />
                <a href="/register"> Register now!</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  authState: state.authState
});

const mapDispatchToProps = dispatch => ({
  loginUser: (userData, history) => dispatch(loginAction(userData, history)),
  logout: () => dispatch(logoutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
