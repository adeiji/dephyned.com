var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BetaTestersSchema = new Schema( {
  email: String,
  code: String,
  inviteeCode: String,
  date: Date
});

module.exports = mongoose.model('BetaTesters', BetaTestersSchema)