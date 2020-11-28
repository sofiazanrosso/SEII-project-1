const Joi = require('joi');


// Validation /auth/register
const register = data => {

    const schema = Joi.object({
        email: Joi
            .string()
            .min(6)
            .max(255)
            .required()
            .email(),
        password: Joi
            .string()
            .min(6)
            .max(1024)
            .required(),
        display_name: Joi
            .string()
            .min(6)
            .max(255)
            .required(),
    });

    return schema.validate(data);
};


// Validation /auth/login
const login = data => {

    const schema = Joi.object({
        email: Joi
            .string()
            .required()
            .email(),
        password: Joi
            .string()
            .required()
    });

    return schema.validate(data);
};


module.exports = {
    registerValidation: register,
    loginValidation: login
};