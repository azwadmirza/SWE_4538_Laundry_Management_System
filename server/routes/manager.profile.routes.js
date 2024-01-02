const express = require('express');
const router = express.Router();
const {getManagerProfileInformation,updateManagerProfile } = require('../controllers/profile.controller');
const isManager=require('../middleware/authorization_verified_manager.middleware');
const { profilePictureUpload } = require('../middleware/image.middleware');


router.get('/api/manager/profile',isManager, getManagerProfileInformation);
router.patch('/api/manager/profile',isManager, profilePictureUpload.single('profilePicture'),updateManagerProfile);

module.exports = router;