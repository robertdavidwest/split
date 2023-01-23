const Sequelize = require("sequelize");
const db = require("../db");

const Section = db.define("section", {
  label: Sequelize.STRING,
  start: Sequelize.FLOAT,
  end: Sequelize.FLOAT,
  playbackRate: Sequelize.FLOAT,
  loop: Sequelize.BOOLEAN,
});

module.exports = Section;
