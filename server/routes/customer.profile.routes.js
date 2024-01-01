const express = require('express');
const router = express.Router();
const { getCustomerProfileInformation, updateCustomerProfile } = require('../controllers/profile.controller');
const isCustomer=require('../middleware/authorization_verified_customer.middleware');
const { profilePictureUpload } = require('../middleware/storage.middleware');

router.get('/api/customer/profile',isCustomer, getCustomerProfileInformation);
router.patch('/api/customer/profile',isCustomer,profilePictureUpload.single('profilePicture'), updateCustomerProfile);

module.exports = router;

