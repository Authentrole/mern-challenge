const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sold: { type: Boolean, required: true },
  date: { type: String, required: true }, // Store as string for easy month comparison
});

module.exports = mongoose.model('Transaction', TransactionSchema);
