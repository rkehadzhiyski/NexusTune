const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ({ email, password, username }) => {
    const isRegistered = await User.exists({ email });

    if (isRegistered) {
        throw new Error('User already exists');
    }

    const user = await User.create({ email, password, username });
    const result = getAuthResult(user);

    return result;
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    const result = getAuthResult(user);

    return result;
};

exports.edit = async (userId, data) => User.findByIdAndUpdate(userId, data);

function getAuthResult(user) {
    const payload = {
        userId: user.id,
        email: user.email,
    };
    //TODO: Make it async
    const token = jwt.sign(payload, 'SECRETSECRET', { expiresIn: '1d' });

    const result = {
        userId: user.id,
        email: user.email,
        username :user.username,
        accessToken: token,
    };

    return result;
}