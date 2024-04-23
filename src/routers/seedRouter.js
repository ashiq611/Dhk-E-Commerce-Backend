const express = require("express");
const { seedUser } = require("../controllers/seedController");
const SeedRouter = express.Router();


SeedRouter.get("/users", seedUser);




module.exports = SeedRouter;