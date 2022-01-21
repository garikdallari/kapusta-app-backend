const updateBalance = require('./updateBalance');
const removeLeadZeroString = require('./removeLeadZeroString');
const normalizeSum = require('./normalizeSum');
const { expenseArray, incomeArray } = require('./iconsNameWarehouse');
const getPack = require('./getPackReducer');

module.exports = {
  updateBalance,
  removeLeadZeroString,
  normalizeSum,
  expenseArray,
  incomeArray,
  getPack,
};
