const Podcast = require('../models/Podcast');

exports.getAll = () => Podcast.find();

exports.getOne = (podcastId) => Podcast.findById(podcastId);

exports.create = (podcastData) => Podcast.create(podcastData);