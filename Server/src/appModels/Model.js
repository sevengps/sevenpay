const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
  },
  gateway: { 
    type: String, 
    required: true 
  },
  platformId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("paymentTransactionDetails", transactionSchema);
