// const mongoose = require('mongoose');

// const coupon = mongoose.Schema({
//   code: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String,
//     required: true,
//   },
//   percent: {
//     type: Number,
//     required: true,
//   },
//   status: {
//     type: String,
//     default: 'Active',
//   },
//   userId: {
//     type: [String],
//   },
//   minimum: {
//     type: Number,
//   },
//   maximum: {
//     type: Number,
//   },
//   product: {
//     type: String,
//   },
//   category: {
//     type: String,
//   },
// }, { timestamp: true });
// module.exports = mongoose.model('coupon', coupon);




const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({

  code: {
    type: String,
    required: true,
  },

  percentage: {
    type: Number,
    required: true,
  },

  expiryDate: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    default: "Active",
  },

  usedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]

});

module.exports = mongoose.model('Coupon', couponSchema);