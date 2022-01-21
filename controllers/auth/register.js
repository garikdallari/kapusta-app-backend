const jwt = require('jsonwebtoken');
const { Conflict } = require('http-errors');
const { SECRET_KEY } = process.env;
const { auth } = require('../../models');
const { User } = auth;

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new Conflict(`User with email: ${email} already exists`);

  const newUser = new User({ name, email });
  newUser.setPassword(password);
  await newUser.save();

  const { _id } = newUser;
  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registration is successful',
    data: {
      token,
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = register;
