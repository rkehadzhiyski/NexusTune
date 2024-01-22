const router = require('express').Router();

const podcastManager = require('../managers/podcastManager');

router.get('/', async (req, res) => {
    const podcasts = await podcastManager.getAll();

    res.json(podcasts);
});

router.post('/', async (req, res) => {
    try {
        const podcast = await podcastManager.create(req.body);
        res.status(204).end();
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