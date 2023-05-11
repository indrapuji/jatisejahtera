const router = require('express').Router();
const user = require('./user');
const data = require('./data');
const claim = require('./claim');
const content = require('./content');
const dashboard = require('./dashboard');
const contact = require('./contact');

router.use('/user', user);
router.use('/data', data);
router.use('/claim', claim);
router.use('/content', content);
router.use('/dashboard', dashboard);
router.use('/contact', contact);

module.exports = router;
