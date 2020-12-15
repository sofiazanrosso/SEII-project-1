const Joi = require('joi');

// ------------------------------------------------------------

// Basic regex for date format yyyy-mm-dd
// To easily visualize this regex use https://www.debuggex.com/
const regexDate = /^20[2-9][0-9]-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// ------------------------------------------------------------

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

// ------------------------------------------------------------

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

// ------------------------------------------------------------

// Validation /private/announcements POST
module.exports.postAnnouncementValidation = data => {

    const schema = Joi.object({
        category: Joi
            .required(),
        title: Joi
            .string()
            .required(),
        content: Joi
            .string()
            .required(),
        publish_date: Joi
            .string()
            .pattern(regexDate, 'yyyy-mm-dd'),
        expiry_date: Joi
            .string()
            .pattern(regexDate, 'yyyy-mm-dd'),
        hide_after: Joi
            .boolean(),
        contact: Joi
            .string()
    });

    return schema.validate(data);
};

// ------------------------------------------------------------

// Validation /private/announcements PATCH
module.exports.patchAnnouncementValidation = data => {

    const schema = Joi.object({
        expiry_date: Joi
            .string()
            .pattern(regexDate, 'yyyy-mm-dd'),
        hide_after: Joi
            .boolean()
    }).min(1);

    return schema.validate(data);
};

// ------------------------------------------------------------

// Validation /private/flyer POST
module.exports.postFlyerValidation = data => {

    const schema = Joi.object({
        category: Joi
            .required(),
        title: Joi
            .required(),
        publish_date: Joi
            .string()
            .pattern(regexDate, 'yyyy-mm-dd'),
        expiry_date: Joi
            .string()
            .pattern(regexDate, 'yyyy-mm-dd'),
        hide_after: Joi
            .boolean(),
        contact: Joi
            .string()
    });

    return schema.validate(data);
};

// ------------------------------------------------------------