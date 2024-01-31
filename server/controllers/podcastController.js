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

router.get('/:podcastId', async (req, res) => {
    const podcast = await podcastManager.getOne(req.params.podcastId);

    res.json(podcast);
});

router.put('/:podcastId', async (req, res) => {
    await podcastManager.update(req.params.podcastId, req.body);

    res.status(204).end();
});

router.delete('/:podcastId', async (req, res) => {
    await podcastManager.delete(podcastId);

    res.status(204).end();
});

module.exports = router;