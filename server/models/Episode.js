const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
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
    audio: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        require: true,
    },
    podcastId: {
        type: mongoose.Types.ObjectId,
        ref: 'Podcast',
    },
    podcastName: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;