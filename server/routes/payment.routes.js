const express=require('express');
const router=express.Router();
const payment=require('../controllers/payment.controller');

router.post('/api/make-payment/success',payment.successfulPayment);
router.post('/api/make-payment/fail',payment.failedPayment);
router.post('/api/make-payment/ipn',payment.instantPaymentNotification);
router.post('/api/make-payment/cancel',payment.cancelPayment);


module.exports = router;