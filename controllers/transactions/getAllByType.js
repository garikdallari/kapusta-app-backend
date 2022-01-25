const {NotFound} = require('http-errors');
const {Transaction} = require('../../models');
const {sortTransactions} = require('../../helpers')

const getAllByType = async (req, res) => {
    const {type} = req.params;
    const {_id} = req.user;
    const data = await Transaction.find({owner: _id});
    if(!data) {
        throw new NotFound('Please, login!');
    };
    const filter = data.filter((element) => element.type === type);
    const result = await sortTransactions(filter);
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getAllByType;