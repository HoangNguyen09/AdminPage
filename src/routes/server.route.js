const express = require("express");
const router = express.Router();
const ServerController = require("../controllers/server.controller");
// const { verifyToken } = require('../middlewares');

router.get("/", ServerController.getAll);
router.post("/", ServerController.createOne);
router.put("/:id", ServerController.updateOne);
router.delete("/:id", ServerController.deleteOne);
router.get("/:id", ServerController.getInformation);

module.exports = router;
