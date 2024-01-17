const router = require('express').Router();

const userManager = require('../managers/userManager');

router.post('/register', async (req, res) => {
    try {
        const result = await userManager.register(req.body);

        res.json(result);

        //TODO: Handle error properly!
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            message: error.message,
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
            message: error.message,
        });

    }
});

router.get('/logout', (req,res) => {
    res.end();
});

module.exports = router;
