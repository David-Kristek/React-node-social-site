const Joi = require("@hapi/joi");

class Validation {
  register(data) {
    const schema = Joi.object({
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "Hesla musí být stejná" }),
    });
    return schema.validate(data);
  }
  login(data) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(data);
  }
}

module.exports = Validation;
