const mongoose = require("mongoose");

const paymentDetailsSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  includes: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  accountName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  bankBranch: {
    type: String,
    required: true,
  },
  formLink: {
    type: String,
    required: true,
  },
});

const PaymentDetails = mongoose.model("PaymentDetails", paymentDetailsSchema);

module.exports = PaymentDetails;
