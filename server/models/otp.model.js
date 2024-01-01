
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

otpSchema.statics.verify = async function (user_id, otp) {
  try {
    const otpDoc = await this.findOne({ user_id, otp:otp });
    if (!otpDoc) {
      throw new Error('Invalid OTP');
    }
    await this.deleteOne({ user_id });
  } catch (error) {
    throw error;
  }
};

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
