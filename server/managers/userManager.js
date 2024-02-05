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

exports.getUploadedPodcasts = async (userId) => {
    try {
        const user = await User.findById(userId).populate('uploadedPodcasts');
        if (!user) {
            throw new Error('User not found');
        }
        return user.uploadedPodcasts;
    } catch (error) {
        throw new Error('Error fetching uploaded podcasts');
    }
};

exports.edit = async (userId, data) => User.findByIdAndUpdate(userId, data);

exports.update = async (userId, data) => {
    try {
        if (data.uploadedPodcasts) {
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            const podcastIds = data.uploadedPodcasts

            user.uploadedPodcasts.push(podcastIds);

            await user.save();

            return user;
        }
    } catch (error) {
        throw new Error(`Error editing user: ${error.message}`);
    }
};

exports.getOne = async (userId) => User.findById(userId);

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
        username: user.username,
        accessToken: token,
    };

    return result;
}