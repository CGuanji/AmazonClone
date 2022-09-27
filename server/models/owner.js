const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

const OwnerSchema = new mongoose.Schema({
  name: String,
  about: String,
  photo: String
});

module.exports = mongoose.model("Owner", OwnerSchema);