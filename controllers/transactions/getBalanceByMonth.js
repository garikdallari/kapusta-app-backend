const {Transaction} = require('../../models');

const getBalanceByMonth = async (req, res) => {
    const {_id} = req.user;
    const {type} = req.params;
  
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    const monthArr = [];
    const yearArr = [currentYear];
    let balanceByMonth = [];   

    for (let i = 6; i > 0; i--) {
        if (currentMonth > 0) {
          monthArr.push(String(currentMonth));
          currentMonth--;
        } else {
          currentMonth += 12;
          currentYear -= 1;
          monthArr.push(String(currentMonth));
          yearArr.push(String(currentYear));
          currentMonth--;
        }
    };

    const data = await Transaction.find({owner: _id, type: type});

    const sortArr = data.reduce((accumulator, element, _, array) => {
        let {date, amount, _id} = element;
        const {month, year} = date;
        let total = 0;

        if(!monthArr.includes(month) || !yearArr.includes(year)) {
          return;
        };

        array.forEach(element => {
          if(month !== element.date.month) {
            return;
          } else if (_id !== element._id) {
            total = amount + element.amount;
          } else {
            return total = amount;
          }
        });

        accumulator = {month: month, amount: total, type};

        const condition = balanceByMonth.some((element) => element.month === month);

        if(condition) {
            return;
        };

        balanceByMonth.push(accumulator)
    }, {});

    res.json({
        status: 'success',
        code: 200,
        result: {
          balanceByMonth
        }
    })
}

module.exports = getBalanceByMonth;
