const express = require('express');
const router = express.Router();
const isManager = require('../middleware/authorization_verified_manager.middleware');
const { promotionalVideoUpload } = require('../middleware/video.middleware');
const { promotionalUpload, getVideo } = require('../controllers/promotional.controller');
const isCustomer = require('../middleware/authorization_verified_customer.middleware');

router.put('/api/promotional-video/upload',isManager,promotionalVideoUpload.single('video'), promotionalUpload);
router.get('/api/promotional-video/:id',isCustomer,getVideo);
module.exports = router;

