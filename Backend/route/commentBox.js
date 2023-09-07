const express = require('express');
const router = express.Router();
const commnet = require('../Controller/commentBox');

router.post('/add/:sid', commnet.addingComment);
router.post('/get/:sid', commnet.all_Comment);

module.exports = router;