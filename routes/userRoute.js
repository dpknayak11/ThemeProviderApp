const express = require('express');
const router = express.Router();
const userContoller = require('../controller/userController')
const { isAuth } = require("../middleware/authenticate");

router.post('/userregister', userContoller.userRegister);
router.post('/loginuser', userContoller.userLogin);
router.post('/updateuser', isAuth, userContoller.updateUser);
router.post('/deleteuser', isAuth, userContoller.deleteUser);


module.exports = router;