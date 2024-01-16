const router = require('express').Router();

const userManager = require('../managers/userManager');

router.post('/register', async (req, res) => {
    try {
        const user = await userManager.rregister(req.body);

        res.json({
            authToken: '',
            email: user.email,
            userId: user._id,
        })
    } catch (error) {
        res.status(400).json({
            message: 'There was an error',
        });
        console.log(error);
    }
});

module.exports = router;
