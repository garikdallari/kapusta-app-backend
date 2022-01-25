const {Transaction} = require('../../models');

const getBalanceBy6Month = async (req, res) => {
    const {_id} = req.user;
    const {type} = req.params;
  
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();
    const monthArr = [];
    const yearArr = [];

    for (let i = 6; i > 0; i--) {
        if (currentMonth > 0) {
          monthArr.push(String(currentMonth));
          yearArr.push(String(currentYear));
          currentMonth--;
        } else {
          currentMonth += 12;
          currentYear -= 1;
          monthArr.push(String(currentMonth));
          yearArr.push(String(currentYear));
          currentMonth--;
        }
    };

    const balanceByMonth = await Transaction.aggregate([
        {$match: {owner: _id, type: type, 
          $or: [{"date.month": monthArr[0], "date.year": yearArr[0]},
          {"date.month": monthArr[1], "date.year": yearArr[1]},
          {"date.month": monthArr[2], "date.year": yearArr[2]},
          {"date.month": monthArr[3], "date.year": yearArr[3]},
          {"date.month": monthArr[4], "date.year": yearArr[4]},
          {"date.month": monthArr[5], "date.year": yearArr[5]},
        ]
        }},
        {$group: {_id: "$date.month",
          month: {$first: "$date.month"},
          amount: {$sum: "$amount"},
          type: {$first: "$type"}
      }}
    ])

    res.json({
        status: 'success',
        code: 200,
        result: {
          balanceByMonth
        }
    })
}

module.exports = getBalanceBy6Month;
