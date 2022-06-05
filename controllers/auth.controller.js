const authService = require('../services/auth.service');
const bcrypt = require('bcryptjs');
const { getUser } = require('../services/auth.service');
const saltRound = 10;

module.exports = {
  signUp: async(req, res, next) => {
    try {
      console.log("Request", req.body)
      let user = await authService.getUser(undefined, req.body.email);
      console.log("user", user)
      if(user) {
        res.status(422).send({status: "success", message: "User already exits"});
      } else {
        console.log("in signup")
        let hash = await bcrypt.hash(req.body.password, saltRound);
        req.body.password = hash;
        let user = await authService.signUp(req.body);
        console.log("userResponse", user)
        res.status(200).send({status: "success", message: "User created successfully"})
      }
    } catch(err) {
      err.desc = "Failed to sign up";
      next(err);
    }
  },

  login: async(req, res, next) => {
    try {
      let user = await getUser(undefined, req.body.email);
      if(user && user.password) {
        let isTrue = await bcrypt.compare(req.body.password, user.password);
        if(isTrue) {
          let token = await authService.generateToken(user._id, user.email);
          res.send({status: "success", message: "Login successfully", token, data: user})
        } else {
          res.status(422).send({status: "failed", message: "Incorrect password"});
        }
      } else {
        res.status(422).send({status: "failed", message: "User does't exists"});
      }
    } catch(err) {
      err.desc = "Failed to login";
      next(err);
    }
  },

  getUser: async(req, res, next) => {
    try {
      let user = await authService.getUser(req.body.user_id, undefined);
      if(user){
        res.send({status: "success", message: "User fetched", data: user});
      } else {
        res.status(422).send({status: "failed", message: "User does't exists"});
      }
    } catch (err) {
      err.desc = "Failed to get user";
      next(err);
    }
  },

  updateUser: async(req, res, next) => {
    try {
      let user = await authService.getUser(req.body.user_id, undefined);
      if(user){
        await authService.updateUser(req.body.user_id, req.body);
        let data = await authService.getUser(req.body.user_id, undefined);
        res.send({status: "success", message: "User updated", data: data});
      } else {
        res.status(422).send({status: "failed", message: "User does't exists"});
      }
    } catch (err) {
      err.desc = "Failed to get user";
      next(err);
    }
  }

}