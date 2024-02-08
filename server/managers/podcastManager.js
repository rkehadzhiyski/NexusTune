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

exports.getLatest = async() =>{
    try {
        const podcast = await Podcast.find().sort({ createdAt: -1 }).limit(5);
        return podcast;
    } catch (error) {
        throw new Error('Error fetching latest podcasts');
    }
}

exports.update = async(podcastId, data) => {
    try {
        if(data.episodes){
            const podcast = await Podcast.findById(podcastId);

            if(!podcast) {
                throw new Error ('Podcast not found');
            }

            podcast.episodes.push(data.episodes);

            await podcast.save();

            return podcast;
        }
    } catch (error) {
        throw new Error(`Error editing podcast: ${error.message}`);
    }
}

exports.delete = (podcastId) => Podcast.findByIdAndDelete(podcastId);