const https = require("https");
const configvars = require("../config/keys");
const Business = require("../models/businessModel");

exports.businesses_get_visitors = (req, res) => {
  Business.find({})
    .populate("visitors", "id name")
    .then(businesses => {
      res.status(200).json(businesses);
    })
    .catch(err => {
      res.status(500).json({ err: { message: "Error fetching visitors" } });
    });
};

exports.businesses_reservation = (req, res) => {
  Business.findOne({ yelpId: req.params.id }).then(result => {
    if (result) {
      if (
        result.visitors.filter(
          el => el.toString() === req.app.locals.userAuth.id
        ).length > 0
      ) {
        const stillVisiting = result.visitors.filter(
          el => el.toString() !== req.app.locals.userAuth.id
        );
        result.visitors = [...stillVisiting];
      } else {
        result.visitors.push(req.app.locals.userAuth.id);
      }
      result
        .save()
        .then(uptodateVal => res.status(200).json(uptodateVal))
        .catch(err => res.status(500).json(err));
    } else {
      new Business({
        yelpId: req.params.id,
        visitors: [req.app.locals.userAuth.id]
      })
        .save()
        .then(newBiz => res.status(200).json(newBiz))
        .catch(err => res.status(500).json(err));
    }
  });
};

exports.yelp_fetching = (req, res) => {
  const opts = {
    host: "api.yelp.com",
    port: 443,
    path: `/v3/businesses/search?location=${encodeURIComponent(
      req.params.location
    )}`,
    method: "GET",
    headers: { authorization: `Bearer ${configvars.YELP_KEY}` }
  };

  let reqs = https.request(opts, incData => {
    let response = "";
    incData.on("data", d => (response += d));
    incData.on("end", resp => res.status(200).json(JSON.parse(response)));
  });

  reqs.end();
};
