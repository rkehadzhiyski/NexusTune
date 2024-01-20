const router = require('express').Router();

const userController = require('./controllers/userController');
const podcastContoller = require('./controllers/podcastController');

router.use('/users', userController);
router.use('/podcasts', podcastContoller);

module.exports = router;