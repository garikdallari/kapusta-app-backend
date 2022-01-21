const { Transaction } = require('../../models');
const { removeLeadZeroString } = require('../../helpers');
const { expenseArray, incomeArray } = require('../../helpers');

const getAllByMonth = async (req, res) => {
  const { date } = req.params;
  const [month, year] = date.split('-');
  const normalizedMonth = removeLeadZeroString(month);

  const data = await Transaction.find({
    owner: req.user._id,
    'date.month': normalizedMonth,
    'date.year': year,
  });
  const expensePack = data.filter(el => el.type === 'expense');
  const incomePack = data.filter(el => el.type === 'income');

  const getPack = pack => {
    const packCopy = JSON.parse(JSON.stringify(pack));
    const data = packCopy.reduce(
      (a, c) => ((a[c.category] = (a[c.category] || 0) + c.amount), a),
      {},
    );
    return Object.entries(data);
  };

  const expenseRes = getPack(expensePack);
  const incomeRes = getPack(incomePack);

  res.json({
    status: 'success',
    code: 200,
    result: { expenseRes, incomeRes },
  });
};

module.exports = getAllByMonth;
