const express = require('express');
const validate = require('../../middlewares/validate');
const authUserValidation = require('../../validations/authUser.validation');
const authUserController = require('../../controllers/authuser.controller');
const authuser = require('../../middlewares/authUser');

const router = express.Router();

router.post('/signup', validate(authUserValidation.registeruser), authUserController.register);
router.post('/login', validate(authUserValidation.login), authUserController.login);
router.post('/logout', validate(authUserValidation.logout), authUserController.logout);

module.exports = router;