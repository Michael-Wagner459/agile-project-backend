const Deal = require('../models/deals');
const Company = require('../models/company');

//create a new deal
exports.createDeal = async (req, res) => {
  const { name, company, stage, closeDate, amount } = req.body;
  if (!name || !company || !stage || !closeDate || !amount) {
    return res.status(400).send('All fields are required');
  }
  try {
    const newDeal = new Deal({ name, company, stage, closeDate, amount });
    const deal = await newDeal.save();
    await Company.findByIdAndUpdate(company, {
      $push: { deals: deal._id },
    });
    res.json(deal);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//get all deals
exports.getDeals = async (req, res) => {
  try {
    const deals = await Deal.find().populate('company');
    res.json(deals);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
};

//get a single deal
exports.getDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id).populate('company');
    res.json(deal);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//update a deal
exports.updateDeal = async (req, res) => {
  const { name, company, stage, closeDate, amount } = req.body;
  if (!name || !company || !stage || !closeDate || !amount) {
    return res.status(400).send('All fields are required');
  }
  try {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      { name, company, stage, closeDate, amount },
      { new: true }
    );
    res.json(deal);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

// Update the stage of a deal
exports.updateDealStage = async (req, res) => {
  const { stage } = req.body;

  if (!stage) {
    return res.status(400).send('Stage is required');
  }

  try {
    const deal = await Deal.findByIdAndUpdate(req.params.id, { stage }, { new: true }).populate('company');
    if (!deal) {
      return res.status(404).send('Deal not found');
    }
    res.json(deal);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

// delete a deal
exports.deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findByIdAndDelete(req.params.id);
    if (!deal) {
      return res.status(404).send('Deal not found');
    }

    await Company.findByIdAndUpdate(deal.company, {
      $pull: { deals: deal._id },
    });
    res.json({ msg: 'Deal removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
};
