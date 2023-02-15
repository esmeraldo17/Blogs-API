const { User } = require('../models');
const token = require('../utils/token');
const { userInputValidation } = require('./validations/inputsValidation');

const checkUser = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    
    if (!user) return { type: 'INVALID FIELDS', message: 'Invalid fields' };

    const JWTtoken = token.generateToken({ email });

    return { type: '', message: JWTtoken };
};

const createUser = async (body) => {
    const err = userInputValidation(body);
    if (err) return { type: 400, message: err };
    const { displayName, email, password, image } = body;

    const user = await User.findOne({ where: { email, password } });
    
    if (user) return { type: 409, message: 'User already registered' };

    await User.create(body);

    const JWTtoken = token.generateToken({
        displayName,
        email,
        image,
    });

    return { type: '', message: JWTtoken };
};

const getAll = async () => {
    const users = await User.findAll();
    const userFilter = users.map((e) => {
        const { dataValues } = e;
        delete dataValues.password;
        return dataValues;
    });
      return { type: '', message: userFilter };
};

module.exports = {
    checkUser,
    createUser,
    getAll,
};