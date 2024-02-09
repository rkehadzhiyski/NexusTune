const Episode = require('../models/Episode');

exports.create = (episodeData) => Episode.create(episodeData);

exports.getOne = (episodeId) => Episode.findById(episodeId);

exports.getLatest = async() =>{
    try {
        const episodes = await Episode.find().sort({ createdAt: -1 }).limit(5);
        return episodes;
    } catch (error) {
        throw new Error('Error fetching latest episode');
    }
}