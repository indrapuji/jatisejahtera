const router = require('express').Router();
const UserControllers = require('../controllers/UserControllers');
const Authentication = require('../middlewares/authentication');
const Authorization = require('../middlewares/authorization');

router.post('/admin-register', UserControllers.userAdminRegister);
router.post('/user-register', Authentication, UserControllers.userRegister);
router.post('/login', UserControllers.userLogin);
router.put('/update-password', Authentication, UserControllers.changePassword);
router.put('/reset-password/:id', Authentication, UserControllers.resetPassword);
router.get('/admin', Authentication, UserControllers.getAdmin);
router.get('/single/:id', Authentication, UserControllers.getAdminId);
router.get('/', Authentication, UserControllers.getAllUser);
router.delete('/delete/:id', Authentication, UserControllers.userDelete);
router.get('/profile', Authentication, UserControllers.userProfile);

module.exports = router;

// BA916181819;
