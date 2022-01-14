const { auth } = require('../../models');
const { User } = auth;

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.json({
    status: 'success',
    code: 200,
    message: 'successed logout',
  });
};

module.exports = logout;
