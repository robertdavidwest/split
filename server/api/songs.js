const router = require("express").Router();
const {
  models: { Song, Section },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const songs = await Song.findAll({
      attributes: ["id", "name", "artist", "duration"],
    });
    res.json(songs);
  } catch (err) {
    next(err);
  }
});

router.get("/:songId", async (req, res, next) => {
  try {
    const songSections = await Song.findByPk(req.params.songId, {
      attributes: ["id", "name", "artist", "duration", "audioUrl"],
      include: Section,
    });
    res.json(songSections);
  } catch (err) {
    next(err);
  }
});
