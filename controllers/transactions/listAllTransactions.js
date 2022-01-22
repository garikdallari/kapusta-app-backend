const {Transaction} = require('../../models');
const {NotFound} = require('http-errors');

const listAllTransactions = async (req, res) => {
    const {_id} = req.user;
    const transactions = await Transaction.find({owner: _id});
    if(!transactions) {
        throw new NotFound('Please, login!')
    };
    res.json({
        status: 'success',
        code: 200,
        data: {
            transactions
        }
    })
}

module.exports = listAllTransactions;
