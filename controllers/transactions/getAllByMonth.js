const { Transaction } = require('../../models');

const getAllByMonth = async (req, res) => {
  const { date } = req.params;
  const [month, year] = date.split('-');

  const data = await Transaction.find({ owner: req.user._id });

  const result = data.filter(
    ({ date }) => date.month === month && date.year === year,
  );

  res.json({
    status: 'success',
    code: 200,
    result,
  });
};

module.exports = getAllByMonth;
