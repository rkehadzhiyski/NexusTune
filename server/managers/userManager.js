const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = (userData) => User.create(userData);

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    const payload = {
        userId: user._id,
        email: user.email,
    };
    //TODO: Make it async
    const token = jwt.sign(payload, 'SECRETSECRET', { expiresIn: '1d' });

    const result = {
        userId: user._id,
        email: user.email,
        accessToken: token,
    };

    return result;
};