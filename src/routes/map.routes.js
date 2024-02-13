const express = require("express");
const router = express.Router();
const controller = require("../controllers/mapControllers")

router.get("/", controller.home)
router.get("/players", controller.players)
router.get("/map/:id", controller.getMap)

module.exports = router;