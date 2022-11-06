const express = require("express");
const router = express.Router();
const LinkController = require("../controllers/link.controller");
// const { verifyToken } = require('../middlewares');

router.get("/full-link/:idEpisode", LinkController.getFullLink);
router.post("/", LinkController.createOne);
router.put("/:id", LinkController.updateOne);
router.delete("/:id", LinkController.deleteOne);
router.get("/:id", LinkController.getInformation);

module.exports = router;
