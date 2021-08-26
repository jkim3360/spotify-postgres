const Sequelize = require('sequelize')
const db = require('../config/database')
const Artist = require('../models/Artist')

const Track = db.define('track', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ISRC: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image_uri: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  artist_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  track_title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

Artist.hasMany(Track, { as: 'Tracks' })
Track.belongsTo(Artist, { foreignKey: 'artistId', as: 'artist' })

module.exports = Track
