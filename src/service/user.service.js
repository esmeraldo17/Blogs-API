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

const getById = async (id) => {
    const user = await User.findOne({ where: +id });

    if (!user) return { type: 404, message: 'User does not exist' };
    delete user.dataValues.password;

    return { type: '', message: user };
};

const removeUser = async (email) => {
    const { id } = await User.findOne({ where: { email } });
    await User.destroy({
      where: { id },
    });
  
    return { message: '' };
  };

module.exports = {
    checkUser,
    createUser,
    getAll,
    getById,
    removeUser,
};