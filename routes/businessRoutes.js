const express = require("express");
const authMW = require("../middlewares/auth");

const {
  businesses_get_visitors,
  businesses_reservation,
  yelp_fetching
} = require("./../controllers/businessControllers");

const router = express.Router();

router.get("/", businesses_get_visitors);
router.get("/yelp/:location", yelp_fetching);
router.patch("/:id", authMW, businesses_reservation);

module.exports = router;
