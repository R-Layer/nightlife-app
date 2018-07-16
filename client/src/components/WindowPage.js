import React, { Component } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import { logoutAction } from "../redux/actions/userActions";
import { getBusinessesAction } from "../redux/actions/businessActions";

import Navbar from "./Navbar";
import GridCard from "./GridCard";

class WindowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessBar: ""
    };
  }

  componentDidMount() {
    const { authState, searchBusinesses } = this.props;
    if (authState.isAuthenticated) {
      searchBusinesses(authState.user.location);
    }
  }

  onChange = e => {
    this.setState({
      businessBar: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.searchBusinesses(this.state.businessBar);
  };

  render() {
    return (
      <div>
        <Navbar
          isAuthenticated={this.props.authState.isAuthenticated}
          logout={this.props.logout}
        />
        <form className="CST_hero-bar" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="businessBar"
            id="businessBar"
            placeholder="Where do you want to go this night?"
            className="CST_search-bar has-text-centered"
            onChange={this.onChange}
            value={this.state.businessBar}
          />
          <button type="submit" className="button">
            Find out relaxing places around
          </button>
        </form>
        <GridCard />
      </div>
    );
  }
}

WindowPage.propTypes = {
  authState: PropTypes.object.isRequired,
  searchBusinesses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authState: state.authState
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
  searchBusinesses: location => dispatch(getBusinessesAction(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowPage);
