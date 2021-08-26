const express = require('express');
const router = express.Router();
const trackRoutes = require('./tracks.route');
const artistRoutes = require('./artists.route');

router.use('/tracks', trackRoutes);
router.use('/artists', artistRoutes);
module.exports = router;