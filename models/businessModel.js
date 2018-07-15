const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  yelpId: {
    type: String,
    required: true
  },
  visitors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      _id: false
    }
  ]
});

const Business = mongoose.model("Business", businessSchema);
module.exports = Business;
