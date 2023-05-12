const router = require('express').Router();
const DataControllers = require('../controllers/DataControllers');
const Authentication = require('../middlewares/authentication');

router.post('/record', Authentication, DataControllers.recordData);
router.post('/staff-record/:id', Authentication, DataControllers.recordFromStaff);
router.put('/update-record/:id', Authentication, DataControllers.updateData);
router.get('/record', Authentication, DataControllers.getUserRecord);
router.get('/allrecord', Authentication, DataControllers.getData);
router.get('/single/:id', Authentication, DataControllers.getSingleRecord);

module.exports = router;
