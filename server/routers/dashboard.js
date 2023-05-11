const router = require('express').Router();
const DashboardControllers = require('../controllers/CountControllers');
const Authentication = require('../middlewares/authentication');

router.get('/member-count', Authentication, DashboardControllers.userCount);

module.exports = router;
