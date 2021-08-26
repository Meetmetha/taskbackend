const express = require('express');
const validate = require('../../middlewares/validate');
const authuser = require('../../middlewares/authUser');
const testValidation = require('../../validations/task.validation');
const taskController = require('../../controllers/task.controller');

const router = express.Router();

router.get('/news',authuser(), validate(testValidation.registeruser), taskController.fetchnews);
router.get('/weather', validate(testValidation.login), taskController.fetchweather);

module.exports = router;