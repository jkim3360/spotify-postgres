const express = require('express');
const router = express.Router();
const artistController = require('../controller/artist.controller');

router.get('/', artistController.findArtist);
router.get('/name/:name', artistController.findArtistByName);
router.post('/:name', artistController.addArtist);
router.put('/:id', artistController.updateArtistById);
router.delete('/:id', artistController.deleteById);

module.exports = router;
