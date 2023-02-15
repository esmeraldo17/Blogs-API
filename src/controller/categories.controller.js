const { categoriesService } = require('../service');

const createCategory = async (req, res) => {
    const { body } = req;
    const { type, message } = await categoriesService.createCategory(body);

    if (type) return res.status(type).json({ message });

    res.status(201).json(message);
};

const getAll = async (_req, res) => {
    const { message } = await categoriesService.getAll();

    res.status(200).json(message);
};

module.exports = {
    createCategory,
    getAll,
};