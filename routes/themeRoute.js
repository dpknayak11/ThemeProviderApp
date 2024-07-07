const express = require('express');
const router = express.Router();
const themeContoller = require('../controller/themeController')
const { isAuth } = require("../middleware/authenticate");

router.post('/getthemeprovider', themeContoller.getThemeProvider);

router.post('/createthemeprovider', isAuth, themeContoller.createThemeProvider);

router.get('/getthemeproviderbyuserid', isAuth, themeContoller.getThemeProviderByUserId);

router.post('/updatethemeprovider', isAuth, themeContoller.updateThemeProvider);

router.post('/deletethemeprovider', isAuth ,themeContoller.deleteThemeProvider);

// router.post('/fieldschema', isAuth ,themeContoller.fieldSchema);
router.post('/addfieldtotheme',themeContoller.addFieldToTheme);

module.exports = router;