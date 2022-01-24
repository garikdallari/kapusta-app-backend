const { auth } = require('../../models');
const { User } = auth;

const current = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findOne({ _id });

  res.json({
    status: 'success',
    code: 200,
    data: {
      name: result.name,
      email: result.email,
      isBalanceSet: result.isBalanceSet,
    },
  });
};

module.exports = current;
