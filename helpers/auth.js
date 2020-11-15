const jwt = require("jsonwebtoken");

const createToken = (data, expireTime) => {
  return jwt.sign(data, process.env.JWTSECRET, {
    expiresIn: expireTime || "1d",
  });
};

const decodeToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);
    if (new Date().getTime > (decodedToken && decodedToken.exp * 1000)) {
      return false;
    }
    return decodedToken;
  } catch (error) {
    return false;
  }
};

module.exports = { createToken, decodeToken };
