const { Op } = require('sequelize')
const Artist = require('../models/Artist')
var artistDao = {
  findAllLike: findAllLike,
  findArtistByName: findArtistByName,
  findOne: findOne,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateArtistById: updateArtistById,
}

async function findAllLike(searchTerm) {
  return await Artist.findAll({
    where: {
      artist_name: {
        [Op.iLike]: `%${searchTerm}%`,
      },
    },
  })
}

async function findArtistByName(searchTerm) {
  return await Artist.findAll({
    where: {
      artist_name: searchTerm,
    },
  })
}

function findOne(value) {
  return Artist.findOne({ where: { ISRC: value } })
}

function create(artist) {
  var newArtist = new Artist(artist)
  return newArtist.save()
}

function findById(id) {
  return Artist.findByPk(id)
}

function deleteById(id) {
  return Artist.destroy({ where: { id: id } })
}

function updateArtistById(artist, id) {
  console.log(artist.artist_name)
  var artistName = {
    artist_name: artist.artist_name,
  }
  return Artist.update(artistName, { where: { id: id } })
}

module.exports = artistDao
