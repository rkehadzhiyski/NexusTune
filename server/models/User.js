const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type:String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    uploadedPodcasts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Podcast'
    }]
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
});

userSchema.methods.getUploadedPodcastIds = function() {
    return this.uploadedPodcasts.map(podcast => podcast.toString());
};

const User = mongoose.model('User', userSchema);

module.exports = User;