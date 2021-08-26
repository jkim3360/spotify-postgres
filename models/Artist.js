const Sequelize = require('sequelize');
const db = require('../config/database');

const Artist = db.define('artist', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    artist_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Artist;