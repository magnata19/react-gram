const express = require('express')
const router = express.Router();

//controller

//middleware
const {photoInsertValidation} = require('../middlewares/photoValidation');
const authGuard = require('../middlewares/authGuard')
const validate = require('../middlewares/handleValidation')
//routes

module.exports = router;