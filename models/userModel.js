const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    default: "Jhon Doe"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  defaultLocation: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
