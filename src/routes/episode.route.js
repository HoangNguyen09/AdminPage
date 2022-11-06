const express = require("express");
const router = express.Router();
const EpisodeController = require("../controllers/episode.controller");
// const { verifyToken } = require('../middlewares');

// router.get("/", EpisodeController.getAll);
router.post("/", EpisodeController.createOne);
router.post("/add-multi", EpisodeController.addMultiEpisode);
router.put("/:id", EpisodeController.updateOne);
router.delete("/:id", EpisodeController.deleteOne);
router.get("/:id", EpisodeController.getInformation);

module.exports = router;
