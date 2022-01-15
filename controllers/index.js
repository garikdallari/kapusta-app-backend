const test = require('./test');
const transactions = require('./transactions');
const auth = require('./auth');

module.exports = { ...test, ...transactions, ...auth };
