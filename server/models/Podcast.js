const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    url: {
        type: String,
        required: true,
    },
});

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;