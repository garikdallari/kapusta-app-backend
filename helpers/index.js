const updateBalance = require('./updateBalance');
const removeLeadZeroString = require('./removeLeadZeroString');
const normalizeSum = require('./normalizeSum');
const { expenseArray, incomeArray } = require('./iconsNameWarehouse');
const { getPack, getBalance } = require('./getPackReducers');

module.exports = {
  updateBalance,
  removeLeadZeroString,
  normalizeSum,
  expenseArray,
  incomeArray,
  getPack,
  getBalance,
};
