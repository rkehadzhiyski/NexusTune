const router = require('express').Router();

const userManager = require('../managers/userManager');

router.post('/register', async (req, res) => {
    try {
        const result = await userManager.register(req.body);

        res.json(result);

    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            error: error.message,
        });

    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await userManager.login(req.body);

        res.json(result);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            error: error.message,
        });
    }
});

router.get('/logout', (req, res) => {
    res.end();
});

router.post('/edit/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await userManager.edit(userId, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            error: error.message,
        });
    }
});

router.put('/update/:userId', async(req,res) => {
    const userId = req.params.userId;

    try {
        const result = await userManager.update(userId, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error updating the user:',
            error: error.message,
        });
    }
});

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await userManager.getOne(userId);
        res.json(result);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            error: error.message,
        });
    }
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const podcasts = await userManager.getUploadedPodcasts(userId);
        res.json(podcasts);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            error: error.message,
        });
    }
});

module.exports = router;
