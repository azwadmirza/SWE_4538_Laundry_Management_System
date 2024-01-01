const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const isCustomer = require('../middleware/authorization_verified_customer.middleware');
const isManager = require('../middleware/authorization_verified_manager.middleware');


router.post('/api/review/add',isCustomer, reviewController.addReview);
router.put('/api/review/update',isCustomer, reviewController.updateReview);
router.get('/api/review/customer/:id',isCustomer, reviewController.getCustomerReview);
router.get('/api/reviews/other-customers/:id',isCustomer, reviewController.getOtherCustomerReviews);
router.get('/api/reviews/manager',isManager, reviewController.getManagerReviews);
router.get('/api/reviewer',isCustomer,reviewController.getReviewerInformation);

module.exports = router;
