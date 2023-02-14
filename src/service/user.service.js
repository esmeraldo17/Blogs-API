const { User } = require('../models');
const token = require('../utils/token');

const checkUser = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    
    if (!user) return { type: 'INVALID FIELDS', message: 'Invalid fields' };

    const JWTtoken = token.generateToken({ email });

    return { type: '', message: JWTtoken };
};

module.exports = {
    checkUser,
};