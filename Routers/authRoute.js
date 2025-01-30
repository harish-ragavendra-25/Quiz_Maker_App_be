const express = require('express');
const router = express.Router();
const { loginFunction,registerFunction } = require('../Controllers/authController');
const { adminLoginFunction,adminRegisterFunction } = require('../Controllers/AdminAuthController');

//Admin Login & Register Route
router.post('/admin/register',adminRegisterFunction);
router.post('/admin/login',adminLoginFunction);

//User Login & Register Route
router.post('/login',loginFunction);
router.post('/register',registerFunction);

module.exports = router;