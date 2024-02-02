const Episode = require('../models/Episode');

exports.create = (episodeData) => Episode.create(episodeData);

exports.getOne = (episodeId) => Episode.findById(episodeId);