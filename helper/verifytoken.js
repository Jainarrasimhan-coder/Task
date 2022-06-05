const jwt = require("jsonwebtoken");
const UserService = require("../services/auth.service");

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token)
    return res
      .status(422)
      .send({ status: "failed", message: "Token not provided" });
  if (!token.includes("Bearer "))
    return res.status(403).send({ status: "failed", message: "Invalid token" });
  token = token.replace("Bearer ", "");
  let decoded = await jwt.verify(token, "SECRET", async (err, decoded) => {
    if (err) {
      return res
        .status(422)
        .send({
          status: "failed",
          message: "Token Expired, Failed to authenticate token",
        });
    } else {
      decoded = decoded.data;
      let user = await UserService.getUser(decoded.id, undefined);
      console.log("User", user)
      if (user) {
        req.decoded = decoded;
        next();
      } else {
        return res
          .status(422)
          .send({ status: "failed", message: "Failed to authenticate token" });
      }
    }
  });
};

module.exports = verifyToken;
