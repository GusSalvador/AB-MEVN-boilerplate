var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  title: String,
  description: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  active: Boolean
});

var Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
