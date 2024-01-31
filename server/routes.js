const router = require('express').Router();

const userController = require('./controllers/userController');
const podcastContoller = require('./controllers/podcastController');
const episodeController = require('./controllers/episodeController');

router.use('/users', userController);
router.use('/podcasts', podcastContoller);
router.use('/episodes', episodeController);

module.exports = router;