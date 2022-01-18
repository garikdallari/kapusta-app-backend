const { Transaction } = require('../../models');
const { removeLeadZeroString } = require('../../helpers');

const getAllByMonth = async (req, res) => {
  const { date } = req.params;
  const [month, year] = date.split('-');
  const normalizedMonth = removeLeadZeroString(month);

  const data = await Transaction.find({
    owner: req.user._id,
    'date.month': normalizedMonth,
    'date.year': year,
  });

  const countSumCategories = (type, item, acc) => {
    if (item.type === type) {
      if (!acc.hasOwnProperty(type)) {
        acc[type] = { categories: {} };
        acc[type].sum = item.amount;
      } else {
        acc[type].sum += item.amount;
      }
      if (!acc[type].categories.hasOwnProperty([item.category])) {
        acc[type].categories[item.category] = { subcategories: {} };
        acc[type].categories[item.category].sum = item.amount;
      } else {
        acc[type].categories[item.category].sum += item.amount;
      }
      if (
        !acc[type].categories[item.category].subcategories.hasOwnProperty([
          item.subcategory,
        ])
      ) {
        acc[type].categories[item.category].subcategories[item.subcategory] =
          item.amount;
      } else {
        acc[type].categories[item.category].subcategories[item.subcategory] +=
          item.amount;
      }
    }
  };

  const result = data.reduce((acc, item) => {
    if (item.type === 'income') {
      countSumCategories('income', item, acc);
    }
    if (item.type === 'expense') {
      countSumCategories('expense', item, acc);
    }
    return { ...acc };
  }, {});

  res.json({
    status: 'success',
    code: 200,
    result,
  });
};

module.exports = getAllByMonth;
