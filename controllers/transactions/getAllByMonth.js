const { Transaction } = require('../../models');

const getAllByMonth = async (req, res) => {
  const { date } = req.params;
  const [month, year] = date.split('-');

  const result = await Transaction.find({ owner: req.user._id });

  const data = result.filter(
    ({ date }) => date.month === month && date.year === year,
  );

  res.json({
    status: 'success',
    code: 200,
    data,
  });
};

module.exports = getAllByMonth;
