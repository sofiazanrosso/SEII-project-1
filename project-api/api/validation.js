const Joi = require('joi');


// Validation /auth/register
module.exports.registerValidation = data => {

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
        displayName: Joi
            .string()
            .min(6)
            .max(255)
            .required(),
    });

    return schema.validate(data);
};


// Validation /auth/login
module.exports.loginValidation = data => {

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
