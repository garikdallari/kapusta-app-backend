const { Transaction } = require('../../models');
const { removeLeadZeroString } = require('../../helpers');
const { getPack, getBalance } = require('../../helpers');

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

  const expenseRes = getPack(expensePack, 'category');
  const incomeRes = getPack(incomePack, 'category');
  const subcategoryIncomeRes = getPack(incomePack, 'subcategory');
  const subcategoryExpenseRes = getPack(expensePack, 'subcategory');

  const expenseBalanceByMonth = getBalance(expensePack) * -1;
  const incomeBalanceByMonth = getBalance(incomePack);

  res.json({
    status: 'success',
    code: 200,
    result: {
      expenseRes,
      incomeRes,
      subcategoryIncomeRes,
      subcategoryExpenseRes,
      expenseBalanceByMonth,
      incomeBalanceByMonth,
    },
  });
};

module.exports = getAllByMonth;
