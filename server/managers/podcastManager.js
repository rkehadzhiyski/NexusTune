const Podcast = require('../models/Podcast');

exports.create = (podcastData) => Podcast.create(podcastData);

exports.getOne = (podcastId) => Podcast.findById(podcastId);

exports.getAll = () => Podcast.find();

exports.getAllOfOwner = (ownerId) => Podcast.find({ ownerId: ownerId });

exports.getEpisodes = async(podcastId)  => {
    try {
        const podcast = await Podcast.findById(podcastId).populate('episodes');
        return podcast.episodes;
    } catch (error) {
        throw new Error('Error fetching uploaded episodes');
    }
}

exports.update = (podcastId, data) => Podcast.findByIdAndUpdate(podcastId, data);

exports.delete = (podcastId) => Podcast.findByIdAndDelete(podcastId);