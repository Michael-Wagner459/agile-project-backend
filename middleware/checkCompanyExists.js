const Company = require('../models/company');

//Middleware to check if the company exists

const checkCompanyExists = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).send('Company not found');
    }
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

module.exports = checkCompanyExists;
