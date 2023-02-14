const { userService } = require('../service');

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const { type, message } = await userService.checkUser(email, password);

    if (type) return res.status(400).json({ message });

    res.status(200).json({ token: message });
};

module.exports = {
    userLogin,
};