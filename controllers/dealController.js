const Deal = require('../models/deals');

//create a new deal
exports.createDeal = async (req, res) => {
  try {
    const { name, company, stage, closeDate, amount } = req.body;
    const newDeal = new Deal({ name, company, stage, closeDate, amount });
    const deal = newDeal.save();
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
    if (!deal) return res.status(404).json({ msg: 'Deal not found' });
    res.json(deal);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

//update a deal
exports.updateDeal = async (req, res) => {
  try {
    const { name, company, stage, closeDate, amount } = req.body;
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

// delete a deal
exports.deleteDeal = async (req, res) => {
  try {
    await Deal.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deal removed' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
};
