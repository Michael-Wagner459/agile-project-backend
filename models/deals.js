const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DealSchema = new Schema({
  name: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: 'company', required: true },
  stage: {
    type: String,
    enum: ['Initiated', 'Qualified', 'Contract Sent', 'Closed Won', 'Closed Lost'],
  },
  createDate: { type: Date, default: Date.now },
  closeDate: Date,
  amount: { type: Number, required: true },
});

const DealModel = mongoose.model('deal', DealSchema);

(module.exports = DealModel), DealSchema;
