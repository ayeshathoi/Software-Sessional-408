//const { addUserToRequest } = require('../middleware/auth');

const { route } = require('./user');

const router = require('express-promise-router')();

//router.use(addUserToRequest)

router.use("/user", require('./user'))
router.use("/patient", require('./patient'))
router.use("/review", require('./review_complaint'))
router.use("/doctor", require('./doctor'))
router.use("/hospital", require('./hospital'))
router.use("/nurse", require('./nurse'))
router.use("/driver", require('./driver'))
router.use("/appointment", require('./booking'))


router.use("/", require('./auth'))

module.exports = router;