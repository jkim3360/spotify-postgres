const artistDao = require('../dao/artist.dao')
var artistController = {
  findArtist: findArtist,
  findArtistByName: findArtistByName,
  addArtist: addArtist,
  deleteById: deleteById,
  updateArtistById: updateArtistById
}

async function findArtist(req, res) {
  try {
    const artistName = req.query.name
    const result = await artistDao.findAllLike(artistName)
    res.status(200).send(result)
  } catch {
    res.status(400).send('Bad request.')
  }
}

async function findArtistByName(req, res) {
  const artistName = req.params.name
  console.log(artistName)
  const result = await artistDao.findArtistByName(artistName)
  res.send(result)
}

function addArtist(req, res) {
  let artist = {
    artist_name: req.params.name,
  }
  artistDao
    .create(artist)
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

function deleteById(req, res) {
  artistDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Artist deleted successfully',
        artist: data,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

function updateArtistById(req, res) {
  console.log(req.body)
  artistDao
    .updateArtistById(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Artist updated successfully',
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

module.exports = artistController
