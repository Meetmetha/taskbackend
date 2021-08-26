const Joi = require('joi');
const { password } = require('./custom.validation');

const newsvalidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.valid('user'),
  }),
};

const weathervalidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
    newsvalidation,
    weathervalidation,
};
