import React, { Component } from "react";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import { logoutAction } from "../redux/actions/userActions";

import Navbar from "./Navbar";

class WindowPage extends Component {
  render() {
    return (
      <div>
        <Navbar
          isAuthenticated={this.props.authState.isAuthenticated}
          logout={this.props.logout}
        />
      </div>
    );
  }
}

WindowPage.propTypes = {
  authState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.authState
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowPage);
