const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;