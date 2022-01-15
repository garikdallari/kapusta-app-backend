const { Transaction } = require('../../models');

const getMonthByPeriod = async (req, res) => {
  const { period } = req.params;
  const periodLenght = period.length;
  if (period) {
    if (periodLenght <= 4) {
      const year = period;
      const result = await Transaction.find({ owner: req.user._id, year });
      res.json({
        status: 'success',
        code: 200,
        result,
      });
    }
  }
  if (periodLenght > 5) {
    const newPeriod = period.split('-');
    const month = newPeriod[0];
    const year = newPeriod[1];
    const result = await Transaction.find({
      owner: req.user._id,
      year,
      month,
    });
    res.json({
      status: 'success',
      code: 200,
      result,
    });
  }
};

module.exports = getMonthByPeriod;
