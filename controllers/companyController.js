const Company = require('../models/company');

//creates a new company
exports.createCompany = async (req, res) => {
  const { logo, name, phoneNumber, address, email, companyOwner, city, country, industry } = req.body;

  if (!logo || !name || !phoneNumber || !address || !email || !companyOwner || !city || !country || !industry) {
    return res.status(400).send('All fields are required');
  }
  try {
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
      createdDate: Date.now(),
      lastActiveDate: Date.now(),
    });
    const company = await newCompany.save();
    return res.status(201).json(company);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

//get all companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    return res.json(companies);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

//get single company
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    return res.json(company);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

//updates company information
exports.updateCompany = async (req, res) => {
  const { logo, name, phoneNumber, address, email, companyOwner, city, country, industry } = req.body;

  if (!logo || !name || !phoneNumber || !address || !email || !companyOwner || !city || !country || !industry) {
    return res.status(400).send('All fields are required');
  }
  try {
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
        lastActiveDate: Date.now(),
      },
      { new: true }
    );
    return res.json(company);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
};

//delete a company
exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    return res.json({ msg: 'Company Removed' });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
