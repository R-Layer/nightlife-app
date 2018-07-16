import React, { Component } from "react";

import PropTypes from "prop-types";

// Lists on hover - credits to  BEN BUD [STACK OVERFLOW]
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJoined: false,
      isShown: false,
      ownVisitors: []
    };
  }

  componentDidUpdate() {
    const { visitors, biz } = this.props;
    const { ownVisitors } = this.state;
    for (let business in visitors) {
      let lastBiz = visitors[business];
      if (
        lastBiz.yelpId === biz.id &&
        lastBiz.visitors.length !== ownVisitors.length
      ) {
        this.setState({
          ownVisitors: lastBiz.visitors
        });
      }
    }
  }

  toggleReserve = e => {
    this.props.reservation(e.target.id);

    this.setState({
      isJoined: !this.state.isJoined
    });
  };

  toggleUsersList = () => {
    if (this.state.ownVisitors.length > 0) {
      this.setState({
        isShown: !this.state.isShown
      });
    }
  };

  render() {
    const { biz, user } = this.props;
    const { isJoined, isShown, ownVisitors } = this.state;
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
            <span
              className="CST_is-monoline CST_is-counter"
              onMouseEnter={this.toggleUsersList}
              onMouseLeave={this.toggleUsersList}
            >
              <span className="icon is-small is-left CST_detach">
                <i className="fas fa-user" />
              </span>
              {ownVisitors.length}
            </span>
            {user.isAuthenticated && (
              <a
                className={`card-footer-item button ${
                  isJoined ? "is-danger" : "is-success"
                }`}
                id={biz.id}
                onClick={this.toggleReserve}
              >
                {isJoined ? "Cancel" : "Join!"}
              </a>
            )}
          </div>
        </div>
        {isShown && (
          <ul className="CST_hover-list">
            {ownVisitors.map(visitor => (
              <li key={visitor._id}>{visitor.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  user: PropTypes.object.isRequired,
  biz: PropTypes.object.isRequired,
  visitors: PropTypes.array.isRequired
};

export default Card;
