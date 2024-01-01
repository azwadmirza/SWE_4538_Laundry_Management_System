const route=require('express').Router();
const {postSignUp,postLogin, customerSignUp, managerSignUp, verifyEmail, verifyOTP} = require('../controllers/authentication.controller');
const {validationMiddleware,validate} = require('../middleware/signup.middleware');
const isUnverifiedUser=require('../middleware/authorization_unverified.middleware');
const { profilePictureUpload } = require('../middleware/storage.middleware');

route.post('/api/login',postLogin);
route.post('/api/signup', validationMiddleware,validate, postSignUp);
route.get('/api/verify',isUnverifiedUser,verifyEmail);
route.post('/api/verify/otp',isUnverifiedUser,verifyOTP);
route.post('/api/customer/signup',isUnverifiedUser,profilePictureUpload.single('profilePicture'),customerSignUp);
route.post('/api/manager/signup',isUnverifiedUser,profilePictureUpload.single('profilePicture'),managerSignUp);


module.exports=route;