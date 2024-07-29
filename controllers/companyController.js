const Company = require('../models/company');

//creates a new company
exports.createCompany = async (req, res) => {
  try {
    const { logo, name, phoneNumber, address, email, companyOwner, city, country, industry } = req.body;
    const newCompany = new Company({
      logo,
      name,
      phoneNumber,
      address,
      email,
      companyOwner,
      city,
      country,
      industry,
    });
    const company = await newCompany.save();
    res.json(company);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//get single company
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ msg: 'Company not found' });
    res.json(company);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//updates company information
exports.updateCompany = async (req, res) => {
  try {
    const { logo, name, phoneNumber, address, email, companyOwner, city, country, industry } = req.body;
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        logo,
        name,
        phoneNumber,
        address,
        email,
        companyOwner,
        city,
        country,
        industry,
      },
      { new: true }
    );
    res.json(company);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//delete a company
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Company Removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
