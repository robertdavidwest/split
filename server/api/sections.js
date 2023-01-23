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
    res.status(201).json(section);
  } catch (err) {
    next(err);
  }
});

router.delete("/:sectionId", async (req, res, next) => {
  try {
    console.log("helllo im here");
    console.log(req.params.sectionId, "sectionId");
    const section = await Section.findByPk(req.params.sectionId);
    await section.destroy();
    res.status(202).json(section);
  } catch (err) {
    next(err);
  }
});
