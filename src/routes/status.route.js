const express = require("express");
const router = express.Router();
const StatusController = require("../controllers/status.controller");
// const { verifyToken } = require('../middlewares');

router.get("/", StatusController.getAll);
router.post("/", StatusController.createOne);
router.put("/:id", StatusController.updateOne);
router.delete("/:id", StatusController.deleteOne);
router.get("/:id", StatusController.getInformation);

module.exports = router;
