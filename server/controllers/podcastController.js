const router = require('express').Router();

const podcastManager = require('../managers/podcastManager');

router.get('/owner/:ownerId', async (req, res) => {
    const owner = req.params.ownerId;

    try {
        const ownerPodcasts = await podcastManager.getAllOfOwner(owner);
        res.json(ownerPodcasts);
    } catch (error) {
        console.error('Error fetching owner podcasts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    const podcasts = await podcastManager.getAll();

    res.json(podcasts);
});

router.post('/', async (req, res) => {
    try {
        const podcast = await podcastManager.create(req.body);
        res.json(podcast._id);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Cannot create Podcast'
        });
    }
});

router.get('/podcast/:podcastId', async (req, res) => {
    try {
        const podcast = await podcastManager.getOne(req.params.podcastId);
        res.json(podcast);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            message: error.message,
        });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const podcasts = await podcastManager.getLatest(req.body);
        res.json(podcasts);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            message: error.message,
        });
    }
});

router.get('/:podcastId', async (req, res) => {
    const podcastId = req.params.podcastId;

    try {
        const episodes = await podcastManager.getEpisodes(podcastId);
        res.json(episodes);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            message: error.message,
        });
    }
});

router.post('/edit/:podcastId', async (req, res) => {
    const podcastId = req.params.podcastId;

    try {
        const result = await podcastManager.update(podcastId, req.body);
        return result;
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            message: error.message,
        });
    }
});

router.delete('/:podcastId', async (req, res) => {
    await podcastManager.delete(podcastId);

    res.status(204).end();
});

module.exports = router;