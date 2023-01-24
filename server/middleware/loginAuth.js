require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

function verifyToken(request, response, next) {
  // check header or url parameters or post parameters for token
  var token = request.headers["x-access-token"];
  if (!token)
    return response
      .status(403)
      .send({ auth: false, message: "No token provided." });

  // verifies secret and checks exp
  jwt.verify(token, JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return response
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    // if everything is good, save to request for use in other routes
    request.body.id = decoded.id;
    next();
  });
}

module.exports = verifyToken;
