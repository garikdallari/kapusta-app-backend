const { Transaction } = require('../../models');

const getMonthByPeriod = async (req, res) => {
  const { data } = req.params;
  const [month, year] = date.split('-');
  const dataLenght = data.length;
  if (data) {
    if (dataLenght <= 4) {
      const year = data.year;
      const result = await Transaction.find({ owner: req.user._id, year });
      res.json({
        status: 'success',
        code: 200,
        result,
      });
    }
  }
  if (dataLenght > 5) {
    const month = data.month;
    const year = data.year;
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
