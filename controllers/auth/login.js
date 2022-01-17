const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;
const { auth } = require("../../models");
const { User } = auth;
const createError = new Unauthorized("User is not authorized");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) next(createError);

  const { _id } = user;
  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        name: user.name,
        email 
        },
    },
  });
};

module.exports = login;
