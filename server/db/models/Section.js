const Sequelize = require("sequelize");
const db = require("../db");

const Section = db.define("section", {
  label: Sequelize.STRING,
  start: Sequelize.DECIMAL,
  end: Sequelize.DECIMAL,
  playBackRate: Sequelize.FLOAT,
  loop: Sequelize.BOOLEAN,
});

module.exports = Section;
