const transactions = require('./transactions');
const auth = require('./auth');

module.exports = { ...transactions, ...auth };
