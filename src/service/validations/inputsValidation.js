const joi = require('joi');

const userSchema = joi.object({
    displayName: joi.string().min(8).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    image: joi.string(),
});

const userInputValidation = (body) => {
    const { error } = userSchema.validate(body);
    if (error) return error.message;
    return null;
};

module.exports = {
    userInputValidation,
};