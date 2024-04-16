const express = require("express");
const { getUsers } = require("../controllers/userController");
const UserRouter = express.Router();



// GET : /api/users
UserRouter.get("/", getUsers);

module.exports = UserRouter;
