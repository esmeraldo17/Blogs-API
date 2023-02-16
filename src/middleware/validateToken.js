require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token not found' });
    try {
        const { email } = jwt.verify(token, JWT_SECRET);
        req.user = email;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }
};

module.exports = {
    validateToken,
};