const express = require('express');
const router = express.Router();
const managerController = require('../controllers/laundry.controller');
const isManager = require('../middleware/authorization_verified_manager.middleware');
const isCustomer = require('../middleware/authorization_verified_customer.middleware');

router.get('/api/manager/get-laundry-details/:id',isCustomer,managerController.getLaundryDetails);
router.get('/api/manager/get-all-laundries',isCustomer,managerController.getAllLaundries);
router.post('/api/order/add-pricing',isManager, managerController.addPricingDetails);
router.patch('/api/order/update-pricing',isManager, managerController.updatePricingDetails);
router.get('/api/manager/get-pricing-details',isManager,managerController.getPricingDetails);
router.delete('/api/order/delete-pricing/:pricingDetailsID',isManager, managerController.deletePricingDetails);

module.exports = router;
