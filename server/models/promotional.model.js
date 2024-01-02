const mongoose = require('mongoose');

const promotionalSchema = new mongoose.Schema({
    managerID: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    }
});

const Promotional = mongoose.model('Promotional', promotionalSchema);

module.exports = Promotional;
