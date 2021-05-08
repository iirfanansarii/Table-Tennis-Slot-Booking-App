// import router
const router = require('express').Router();

// controller
const { signup, signin } = require('../controller/userController');

// router
router.post('/user', signup);
router.post('/user/login',signin);

// export router
module.exports = router;