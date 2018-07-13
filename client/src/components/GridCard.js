import React, { Component } from "react";

import response from "./forms/response.json";

class GridCard extends Component {
  render() {
    console.log(response.businesses.length);
    const bizz = response.businesses.map(biz => (
      <div className="column is-4" key={biz.id}>
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
            <button className="card-footer-item button is-success">
              Join!
            </button>
          </div>
        </div>
      </div>
    ));

    return <div className="columns is-multiline">{bizz}</div>;
  }
}

export default GridCard;
