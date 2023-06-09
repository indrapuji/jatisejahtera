const router = require('express').Router();
const UserControllers = require('../controllers/UserControllers');
const Authentication = require('../middlewares/authentication');

router.post('/admin-register', UserControllers.userAdminRegister);
router.post('/user-register', Authentication, UserControllers.userStaffRegister);
router.post('/register', UserControllers.userRegister);
router.post('/login', UserControllers.userLogin);
router.put('/update-password', Authentication, UserControllers.changePassword);
router.put('/reset-password/:id', Authentication, UserControllers.resetPassword);
router.get('/admin', Authentication, UserControllers.getAdmin);
router.get('/single/:id', Authentication, UserControllers.getAdminId);
router.get('/', Authentication, UserControllers.getAllUser);
router.delete('/delete/:id', Authentication, UserControllers.userDelete);
router.get('/profile', Authentication, UserControllers.userProfile);
router.post('/check-user', UserControllers.checkUser);

module.exports = router;

// BA916181819;
