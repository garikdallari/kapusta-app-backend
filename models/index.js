const { Test } = require('./test');
const transaction = require('./transaction');
const auth = require('./auth');

module.exports = {
  Test,
  ...transaction,
  auth,
};
