const express = require("express");
const router = express.Router();
const CountryController = require("../controllers/country.controller");
// const { verifyToken } = require('../middlewares');

router.get("/", CountryController.getAll);
router.post("/", CountryController.createOne);
router.put("/:id", CountryController.updateOne);
router.delete("/:id", CountryController.deleteOne);
router.get("/:id", CountryController.getInformation);

module.exports = router;
