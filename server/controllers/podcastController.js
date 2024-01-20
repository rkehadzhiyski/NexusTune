const router = require('express').Router();

const podcastManager = require('../managers/podcastManager');

router.post('/' , async(req,res) => {
    try {
        const podcast = await podcastManager.create(req.body);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({
            message: 'Cannot create Podcast'
        });
    }
});

module.exports = router;