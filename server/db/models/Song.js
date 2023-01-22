const Sequelize = require("sequelize");
const db = require("../db");

const Song = db.define("song", {
  name: Sequelize.STRING,
  audioUrl: Sequelize.STRING,
  artist: Sequelize.STRING,
  duration: Sequelize.FLOAT,
});

module.exports = Song;
