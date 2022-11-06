const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/role.controller");
// const { verifyToken } = require('../middlewares');

router.get("/", RoleController.getAll);
router.post("/", RoleController.createOne);
router.put("/:id", RoleController.updateOne);
router.delete("/:id", RoleController.deleteOne);
router.get("/:id", RoleController.getInformation);

module.exports = router;
