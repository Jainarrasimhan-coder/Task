const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: async (id, email) => {
    let token = jwt.sign({ data: { id: id, email: email } }, "SECRET", {expiresIn: '24h'});
    token = "Bearer " + token;
    return token
  },

  getUser: async(id, email) => {
    let query = {};
    if(id) query._id = id;
    if(email) query.email = email;
    let user = await User.findOne(query);
    return user;
  },

  signUp: async (data) => {
    let user = await User.create(data);
    return user;
  },

  updateUser: async (id, data) => {
    let user = await User.findByIdAndUpdate({_id: id}, data);
    return user;
  },
}