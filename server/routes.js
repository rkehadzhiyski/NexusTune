const router = require('express').Router();

const userController = require('./controllers/userController');
const podcastContoller = require('./controllers/podcastController');
const episodeController = require('./controllers/episodeController');
const commentController = require('./controllers/commentConroller');

router.use('/users', userController);
router.use('/podcasts', podcastContoller);
router.use('/episodes', episodeController);
router.use('/comments', commentController);

module.exports = router;