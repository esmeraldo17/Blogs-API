const { userService } = require('../service');

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const { type, message } = await userService.checkUser(email, password);

    if (type) return res.status(400).json({ message });

    res.status(200).json({ token: message });
};

const createUser = async (req, res) => {
    const { body } = req;
    const { type, message } = await userService.createUser(body);

    if (type) return res.status(type).json({ message });

    res.status(201).json({ token: message });
};

const getAll = async (req, res) => {
    const { message } = await userService.getAll();

    res.status(200).json(message);
};

module.exports = {
    userLogin,
    createUser,
    getAll,
};