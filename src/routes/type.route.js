const express = require("express");
const router = express.Router();
const TypeController = require("../controllers/type.controller");
// const { verifyToken } = require('../middlewares');

router.get("/", TypeController.getAll);
router.post("/", TypeController.createOne);
router.put("/:id", TypeController.updateOne);
router.delete("/:id", TypeController.deleteOne);
router.get("/:id", TypeController.getInformation);

module.exports = router;
