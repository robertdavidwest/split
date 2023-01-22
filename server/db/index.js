//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Song = require("./models/Song");
const Section = require("./models/Section");

Song.belongsTo(User);
User.hasMany(Song);

Section.belongsTo(Song);
Song.hasMany(Section);

module.exports = {
  db,
  models: {
    User,
    Song,
    Section,
  },
};
