const Podcast = require('../models/Podcast');

exports.getAll = () => Podcast.find();

exports.create = (podcastData) => Podcast.create(podcastData);