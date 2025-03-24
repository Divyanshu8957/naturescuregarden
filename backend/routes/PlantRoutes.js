const express = require("express");
const { getAllPlants, getPlantById, searchPlants } = require("../controllers/plantControllers");

const router = express.Router();

// Route to get all plants
router.get("/", getAllPlants);

// Place the search route BEFORE the getPlantById route
router.get("/search", searchPlants);

// Route to get a single plant by ID
router.get("/:id", getPlantById);

module.exports = router;

