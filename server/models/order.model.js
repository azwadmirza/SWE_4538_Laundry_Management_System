const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    laundryManagerID: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    },
    customerProfilePicture: {
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
    laundryProfilePicture: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:"Pending",
        enum:["Pending","Approved","Completed","Ready","Paying","Paid","Cancelled"]
    },
    paymentMethod:{
        type:String,
        enum:["cash","digital"]
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        service: {
            type: String,
            required: true
        },
        unitPrice: {
            type: Number,
            required: true
        }
    }]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
