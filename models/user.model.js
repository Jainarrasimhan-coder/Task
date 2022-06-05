const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type : String , unique : true, required : true },
  password: String,
  reset_password_hash: String,
  phone_number: String,
  plan: {type: String, default: "Silver"}
});

const user = mongoose.model('user', userSchema);

module.exports = user;