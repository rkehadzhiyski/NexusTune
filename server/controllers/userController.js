const router = require('express').Router();

const userManager = require('../managers/userManager');

router.post('/register', async (req, res) => {
    try {
        const user = await userManager.rregister(req.body);

        res.json({
            userId: user._id,
            email: user.email,
            accessToken: 'no-token',
        })
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            message: err.message,
        });
        console.log(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await userManager.login(req.body);

        res.json(result);
    } catch (error) {
        res.status(400).json({
            message: 'There was an error:',
            message: err.message,
        });
        
    }
});

module.exports = router;
