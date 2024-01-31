const router = require('express').Router();

const episodeManager = require('../managers/episodeManager');

router.post('/', async(req, res) => {
    try {
        const episode = await episodeManager.create(req.body);
        res.json(episode);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Cannot create Episode'
        });
    }
});

module.exports = router;