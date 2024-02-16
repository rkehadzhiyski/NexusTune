const router = require('express').Router();

const commentManager = require('../managers/commentManager');

router.post('/', async (req, res) => {
    try {
        const comment = await commentManager.create(req.body);
        res.json(comment);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'Cannot create Comment'
        });
    }
});