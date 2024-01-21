const Podcast = require('../models/Podcast');

exports.create = (podcastData) => Podcast.create(podcastData);

exports.getOne = (podcastId) => Podcast.findById(podcastId);

exports.getAll = () => Podcast.find();

exports.update = (podcastId) => Podcast.findByIdAndUpdate(podcastId);

exports.delete = (podcastId) => Podcast.findByIdAndDelete(podcastId);