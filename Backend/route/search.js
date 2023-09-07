const express = require('express');
const router = express.Router();
const userController = require('../Controller/search');

router.post('/ambulance', userController.Driver_search_Thana);

module.exports = router;