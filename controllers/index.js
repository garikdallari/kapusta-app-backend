const transactions = require('./transactions');
const auth = require('./auth');
const balance = require('./balance');

module.exports = { ...transactions, ...auth, ...balance };
