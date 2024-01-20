const Podcast = require('../models/Podcast');

exports.create = (podcastData) => Podcast.create(podcastData);