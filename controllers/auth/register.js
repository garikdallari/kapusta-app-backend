const bcrypt = require("bcryptjs");
const { Conflict } = require("http-errors");
const { auth } = require("../../models");
const { User } = auth;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new Conflict(`User with email: ${email} already exists`);

  const newUser = new User({ name, email });
  newUser.setPassword(password);
  await newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Registration is successful",
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = register;
