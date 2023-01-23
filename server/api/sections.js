const router = require("express").Router();
const {
  models: { Section },
} = require("../db");
module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    const { songId, label, start, end, playbackRate, loop } = req.body;
    const section = await Section.create({
      songId,
      label,
      start,
      end,
      playbackRate,
      loop,
    });
    res.json(section);
  } catch (err) {
    next(err);
  }
});
