const express = require("express");
const router = express.Router();
const YearController = require("../controllers/year.controller");
// const { verifyToken } = require('../middlewares');

router.get("/", YearController.getAll);
router.post("/", YearController.createOne);
router.put("/:id", YearController.updateOne);
router.delete("/:id", YearController.deleteOne);
router.get("/:id", YearController.getInformation);

module.exports = router;
