const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true
  },
  customerProfilePicture: {
    type: String,
    required: true
  },
  managerID: {
    type: String,
    required: true
  },
  managerProfilePicture: {
    type: String,
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  laundryName: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  rev_stars: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
