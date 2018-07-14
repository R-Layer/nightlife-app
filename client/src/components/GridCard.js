import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { joinAction, cancelAction } from "./../redux/actions/businessActions";

import response from "./forms/response.json";

/* 
id 
name
isClosed
image_url
location.display_address[0] 
location.city
location.state
display_phone
url

---
visitors array

*/

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJoined: false
    };
  }

  toggleReserve = e => {
    this.state.isJoined
      ? this.props.cancel(e.target.id)
      : this.props.join(e.target.id);
    this.setState({
      isJoined: !this.state.isJoined
    });
  };

  render() {
    const { biz } = this.props;
    const { isJoined } = this.state;
    return (
      <div className="column is-4">
        <div className="card CST_biz-card">
          <div className="card-header">
            <div className="CST_is-opposed card-header-title">
              <span className="CST_is-monoline">{biz.name}</span>
              {biz.isClosed ? (
                <span className="CST_is-closed">CLOSED</span>
              ) : (
                <span className="CST_is-open">OPEN</span>
              )}
            </div>
          </div>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={biz.image_url} alt="business preview" />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              <p>
                <span className="icon is-small is-left">
                  <i className="fas fa-home" />
                </span>
                <span className="CST_detach">
                  {biz.location.display_address[0]} <br />
                  <small className="CST_detach">
                    {biz.location.city}
                    {", "}
                    {biz.location.state}
                  </small>
                </span>
              </p>
              <p>
                <span className="icon is-small is-left">
                  <i className="fas fa-phone" />
                </span>
                <span className="CST_detach">{biz.display_phone} </span>
              </p>
              <p>
                <span className="icon is-small is-left">
                  <i className="fab fa-yelp" />
                </span>
                <span className="CST_detach">
                  <a href={biz.url}>Yelp details</a>
                </span>
              </p>
            </div>
          </div>
          <div className="card-footer">
            <span className="CST_is-monoline CST_is-counter">
              <span className="icon is-small is-left CST_detach">
                <i className="fas fa-user" />
              </span>
              {biz.review_count}
            </span>
            <a
              className={`card-footer-item button ${
                isJoined ? "is-danger" : "is-success"
              }`}
              id={biz.id}
              onClick={this.toggleReserve}
            >
              {isJoined ? "Cancel" : "Join!"}
            </a>
          </div>
        </div>
      </div>
    );
  }
}
class GridCard extends Component {
  join = id => {
    this.props.join(id);
  };

  cancel = id => {
    this.props.cancel(id);
  };

  render() {
    const bizz = response.businesses.map(biz => (
      <Card biz={biz} join={this.join} cancel={this.cancel} key={biz.id} />
    ));

    return <div className="columns is-multiline">{bizz}</div>;
  }
}

GridCard.propTypes = {
  authState: PropTypes.object.isRequired
};

Card.propTypes = {
  biz: PropTypes.object.isRequired,
  join: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authState: state.authState
});

const mapDispatchToProps = dispatch => ({
  join: id => dispatch(joinAction(id)),
  cancel: id => dispatch(cancelAction(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridCard);
