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

  const getDataByType = (type, item, acc) => {
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

  const allData = data.reduce((acc, item) => {
    if (item.type === 'income') {
      getDataByType('income', item, acc);
    }
    if (item.type === 'expense') {
      getDataByType('expense', item, acc);
    }
    return { ...acc };
  }, {});

  const getCategories = type => {
    const arr = [];
    for (let item in allData[type]?.categories) {
      arr.push({
        category: item,
        sum: allData[type].categories[item].sum,
      });
    }

    return arr;
  };

  const getSubcategories = type => {
    const obj = {};
    for (let item in allData[type]?.categories) {
      obj[item] = [allData[type].categories[item].subcategories];
      obj[item] = Object.keys(allData[type].categories[item].subcategories).map(
        i => {
          return {
            subcategory: i,
            sum: allData[type].categories[item].subcategories[i],
          };
        },
      );
    }

    return obj;
  };

  const result = {
    incomeSum: allData.income?.sum ?? 0,
    expenseSum: allData.expense?.sum ?? 0,
    incomeCategories: getCategories('income'),
    expenseCategories: getCategories('expense'),
    incomeSubcategories: getSubcategories('income'),
    expenseSubcategories: getSubcategories('expense'),
  };

  res.json({
    status: 'success',
    code: 200,
    result,
  });
};

module.exports = getAllByMonth;
