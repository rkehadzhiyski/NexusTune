const router = require('express').Router();

const episodeManager = require('../managers/episodeManager');

router.post('/', async(req, res) => {
    try {
        const episode = await episodeManager.create(req.body);
        res.json(episode._id);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Cannot create Episode'
        });
    }
});

router.get('/:episodeId', async(req,res) =>{
    const episodeId = req.params.episodeId;

    try {
        const episode = await episodeManager.getOne(episodeId);
        res.json(episode);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Cannot find Episode'
        });
    }
});

router.get('/latest/episodes', async (req, res) => {
    try {
        const episodes = await episodeManager.getLatest();
        res.json(episodes);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            error: error.message,
        });
    }
});

module.exports = router;