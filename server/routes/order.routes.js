const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const isCustomer=require('../middleware/authorization_verified_customer.middleware');
const isManager=require('../middleware/authorization_verified_manager.middleware');
const isVerifiedUser = require('../middleware/authorization_verified.middleware');

router.post('/api/add-order',isCustomer, orderController.addOrder);
router.patch('/api/update-status',isVerifiedUser, orderController.updateStatus);
router.patch('/api/update-payment',isVerifiedUser, orderController.makePayment);
router.get('/api/get-orders/customer',isCustomer, orderController.getOrdersByCustomerID);
router.get('/api/get-orders/manager',isManager, orderController.getOrdersByManagerID);

module.exports = router;
