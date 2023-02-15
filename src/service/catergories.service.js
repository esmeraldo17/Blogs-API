const { Category } = require('../models');
const { categoryInputValidation } = require('./validations/inputsValidation');

const createCategory = async (body) => {
    const err = categoryInputValidation(body);
    if (err) return { type: 400, message: err };

    const createdCategory = await Category.create(body);

    return { type: '', message: createdCategory };
};

const getAll = async () => {
    const categories = await Category.findAll();

    return { type: '', message: categories };
};

module.exports = {
    createCategory,
    getAll,
};