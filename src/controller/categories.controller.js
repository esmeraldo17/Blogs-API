const { categoriesService } = require('../service');

const createCategory = async (req, res) => {
    const { body } = req;
    const { type, message } = await categoriesService.createCategory(body);

    if (type) return res.status(type).json({ message });

    res.status(201).json(message);
};

module.exports = {
    createCategory,
};