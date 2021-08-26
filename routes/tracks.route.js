const express = require('express');
const router = express.Router();
const trackController = require('../controller/track.controller');

router.get('/', trackController.findTracks);
router.get('/:isrc', trackController.findTrackByISRC);
router.post('/:isrc', trackController.addTrackByISRC);
router.put('/:id', trackController.updateTrack);
router.delete('/:id', trackController.deleteById);

module.exports = router;
