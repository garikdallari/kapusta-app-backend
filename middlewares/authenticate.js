const jwt = require("jsonwebtoken");
const { auth } = require("../models");
const { User } = auth;
const { SECRET_KEY } = process.env;
const { setErrorMessage } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  try {
    if (!authorization) setErrorMessage(res);

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") setErrorMessage(res);

    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById({ _id });

    if (!user.token) setErrorMessage(res);

    req.user = user;
    next();
  } catch (error) {
    setErrorMessage(res);
    return;
  }
};

module.exports = authenticate;
