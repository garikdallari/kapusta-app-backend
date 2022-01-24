const {Transaction} = require('../../models');
const {NotFound} = require('http-errors');
const {sortTransactions} = require('../../helpers')

const listAllTransactions = async (req, res) => {
    const {_id} = req.user;
    const data = await Transaction.find({owner: _id});
    if(!data) {
        throw new NotFound('Please, login!')
    };
    const transactions = await sortTransactions(data);
    res.json({
        status: 'success',
        code: 200,
        data: {
            transactions
        }
    })
}

module.exports = listAllTransactions;
