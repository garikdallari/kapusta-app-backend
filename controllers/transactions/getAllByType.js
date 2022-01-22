const {NotFound} = require('http-errors');
const {Transaction} = require('../../models');

const getAllByType = async (req, res) => {
    const {type} = req.params;
    const {_id} = req.user;
    const data = await Transaction.find({owner: _id});
    if(!data) {
        throw new NotFound('Please, login!');
    };
    const result1 = data.filter((element) => element.type === type);
    const result = result1.sort()
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getAllByType;