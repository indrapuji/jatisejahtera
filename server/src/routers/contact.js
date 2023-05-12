const router = require('express').Router();
const ContactControllers = require('../controllers/ContactControllers');

router.post('/add', ContactControllers.addContact);
router.get('/', ContactControllers.getContact);
router.get('/single/:id', ContactControllers.getSingleContact);
router.delete('/delete/:id', ContactControllers.deleteContact);
router.put('/read/:id', ContactControllers.readContact);

module.exports = router;
