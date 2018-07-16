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
      this.props.getVisitors();
    });
  };

  componentDidMount = () => {
    this.props.getVisitors();
  };

  render() {
    const { businesses, authState, visitors } = this.props;
    console.log(businesses);
    let arrToMap = response.businesses;
    const bizz = arrToMap.map(biz => {
      return (
        <Card
          user={authState}
          biz={biz}
          visitors={visitors}
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
  visitors: PropTypes.array.isRequired,
  businesses: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authState: state.authState,
  visitors: state.visitors,
  businesses: state.businesses,
  reservations: state.reservations
});

const mapDispatchToProps = dispatch => ({
  reservation: id => dispatch(reservationAction(id)),
  getVisitors: () => dispatch(getVisitorsAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridCard);
