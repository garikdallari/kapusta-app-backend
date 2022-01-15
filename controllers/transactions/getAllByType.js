const {NotFound} = require('http-errors');
const {Transaction} = require('../../models');

const getAllByType = async (req, res) => {
    const {type} = req.params;
    const {_id} = req.user;
    const data = await Transaction.find({owner: _id});
    if(!data) {
        throw new NotFound('Please, login!');
    };
    const result = data.filter((element) => element.type === type);
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getAllByType;