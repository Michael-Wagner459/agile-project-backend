const Deal = require('../models/deals');

//Middleware to check if deal exists

const checkDealExists = async (req, res, next) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).send('Deal not found');
    }
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

module.exports = checkDealExists;
