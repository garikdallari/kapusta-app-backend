const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { auth } = require("../models");
const { User } = auth;
const { SECRET_KEY } = process.env;
const createError = new Unauthorized("User is not authorized");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  try {
    if (!authorization) next(createError);

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") next(createError);

    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById({ _id });

    if (!user.token) next(createError);

    req.user = user;
    next();
  } catch (error) {
    next(createError);
    return;
  }
};

module.exports = authenticate;
