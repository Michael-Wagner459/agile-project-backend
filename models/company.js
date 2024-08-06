const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define company model
const CompanySchema = new Schema({
  id: Number,
  logo: String,
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  companyOwner: String,
  city: String,
  country: String,
  industry: String,
  createdDate: { type: Date, deault: Date.now },
  lastActiveDate: Date,
  deals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'deal',
    },
  ],
});

const CompanyModel = mongoose.model('company', CompanySchema);

(module.exports = CompanyModel), CompanySchema;
