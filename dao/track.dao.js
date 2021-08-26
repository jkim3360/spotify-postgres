const { Op, json } = require('sequelize')
const Track = require('../models/Track')
const Artist = require('../models/Artist')
const axios = require('axios')

var trackDao = {
  findAll: findAll,
  findOne: findOne,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateTrack: updateTrack,
}

async function findAll(searchTerm) {
  return await Track.findAll()
}

function findOne(value) {
  return Track.findOne({ where: { ISRC: value } })
}

function findById(id) {
  return Track.findByPk(id)
}

function deleteById(id) {
  return Track.destroy({ where: { id: id } })
}

function create(track) {
  var newTrack = new Track(track)
  newTrack.save()
}

function updateTrack(track, id) {
  var updateTrack = {
    title: track.title,
    technologies: track.technologies,
    description: track.description,
    budget: track.budget,
    contact_email: track.contact_email,
  }
  return Track.update(updateTrack, { where: { id: id } })
}

module.exports = trackDao
