import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import Card from "./Card";

import {
  reservationAction,
  getVisitorsAction
} from "./../redux/actions/businessActions";

import response from "./forms/response.json";

class GridCard extends Component {
  reservation = id => {
    this.props.reservation(id).then(() => {
      this.props.visitors();
    });
  };

  componentDidMount = () => {
    this.props.visitors();
  };

  render() {
    const bizz = response.businesses.map(biz => {
      return (
        <Card
          user={this.props.authState}
          biz={biz}
          businesses={this.props.businesses}
          reservation={this.reservation}
          key={biz.id}
        />
      );
    });

    return <div className="columns is-multiline">{bizz}</div>;
  }
}

GridCard.propTypes = {
  authState: PropTypes.object.isRequired,
  businesses: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  authState: state.authState,
  businesses: state.businesses,
  reservations: state.reservations
});

const mapDispatchToProps = dispatch => ({
  reservation: id => dispatch(reservationAction(id)),
  visitors: () => dispatch(getVisitorsAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridCard);
