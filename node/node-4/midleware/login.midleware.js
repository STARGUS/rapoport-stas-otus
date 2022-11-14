const controller = require("../db/user/controller");
const tokenKey = "rapoport";
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const auth = req.cookies["authorization"] || req.headers.authorization;
  if (!!auth) {
    let token = auth.split(" ")[1];
    await jwt.verify(token, tokenKey, async (err, payload) => {
      if (payload) {
        let user = await controller.findOneById(payload.id);
        if (!!user) {
          req.user = user;
        }
        if (!req.user) next();
      } else if (err) {
        console.log(err);
        next();
      }
    });
  }
  next();
};
