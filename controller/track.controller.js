const axios = require('axios')
const querystring = require('querystring')
const env = require('../config/config')
console.log(env)

const trackDao = require('../dao/track.dao')
var trackController = {
  findTracks: findTracks,
  findTrackByISRC: findTrackByISRC,
  addTrackByISRC: addTrackByISRC,
  updateTrack: updateTrack,
  deleteById: deleteById,
}

async function findTracks(req, res) {
  const result = await trackDao.findAll()
  console.log(result)
  res.send(result)
}

async function findTrackByISRC(req, res) {
  // Secure endpoint with custom API key. Check scripts/functions.js for key generator
  const ISRC = req.params.isrc

  const track = await trackDao.findOne(ISRC)
  if (!track) {
    res.status(400)
    res.send('Bad ISRC.')
  } else {
    res.json(track)
  }
}

async function addTrackByISRC(req, res) {
  const apikey = req.query.apikey
  if (apikey !== 'qQG5jtHFEw7PylRBc9S53mtNyNzHKLZt') {
    res.status(400)
    res.send('Bad API key.')
    res.end()
    return
  }
  // Spotify id and secret to obtain access token
  const data = {
    grant_type: 'client_credentials',
    client_id: env.username,
    client_secret: env.password,
  }

  // Get Spotify access token for API access
  try {
  let token
  await axios
    .post('https://accounts.spotify.com/api/token', querystring.stringify(data))
    .then((response) => {
      token = response.data.access_token
    })
    .catch((error) => {
      console.log('error ' + error)
    })

  // Axios config and body parameters
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const bodyParameters = {
    key: 'value',
  }
  const ISRC = req.params.isrc
  let trackData

  // Get track data from Spotify API
  await axios
    .get(
      `https://api.spotify.com/v1/search?q=isrc:${ISRC}&type=track`,
      config,
      bodyParameters
    )
    .then((response) => {
      response = response.data

      if (response.tracks.items.length > 1) {
        var sorted = response.tracks.items.sort(function (a, b) {
          return b.popularity - a.popularity
        })
        trackData = sorted[0]
      } else {
        trackData = response.tracks.items[0]
      }
    })
    .catch((error) => {
      console.log('error ' + error)
    })

  const existingTrack = await trackDao.findOne(ISRC)
  const artistName = trackData.album.artists[0].name
  const imageUri = trackData.album.images[0].url
  const trackTitle = trackData.name
  let artistId

  const findArtist = await axios.get(
    env.apiPrefix +`artists/name/${artistName}`
  )

  const existingArtist = findArtist.data

  if (existingTrack) {
    res.send(`This track already exists in the database.`)
    console.error('This track already exists in the database.')
    return
  }

  if (existingArtist.length < 1) {
    axios
      .post(env.apiPrefix +`artists/${artistName}`) // Save artist to database when querying and saving track to db
      .then((res) => {
        artistId = res.data.id
        var track = {
          ISRC: ISRC,
          image_uri: imageUri,
          artist_name: artistName,
          track_title: trackTitle,
          artistId: artistId,
        }
        trackDao.create(track)
      })
      .catch((error) => console.error(error))
  } else if (existingArtist.length > 0) {
    var track = {
      ISRC: ISRC,
      image_uri: imageUri,
      artist_name: artistName,
      track_title: trackTitle,
      artistId: existingArtist[0].id, // If artist exists in artist table, add artist ID to track
    }
    trackDao.create(track)
    res.status(200).json({
      message: 'Track created successfully'
    })
  }

  res.send(`${trackTitle} by ${artistName} added to db!`)
} catch (error) {
  console.log(error)
}
}

function deleteById(req, res) {
  trackDao
    .deleteById(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Track deleted successfully',
        track: data,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

function updateTrack(req, res) {
  trackDao
    .updateTrack(req.body, req.params.id)
    .then((data) => {
      res.status(200).json({
        message: 'Track updated successfully',
        track: data,
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

module.exports = trackController
