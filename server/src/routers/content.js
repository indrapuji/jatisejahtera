const router = require('express').Router();
const ContentControllers = require('../controllers/ContentControllers');
const multer = require('multer');
const storage = require('../helpers/multer');

const upload = multer({storage});

router.get('/', ContentControllers.getAllContent);
router.get('/single', ContentControllers.getSingleContent);
router.post('/create', upload.single('image_url'), ContentControllers.createContent);
router.put('/single/:id', ContentControllers.updateContent);
router.delete('/:id', ContentControllers.deleteContent);

module.exports = router;
