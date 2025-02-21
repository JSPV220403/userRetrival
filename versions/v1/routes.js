const express = require("express");
const storage = require("./utils/storage");
const userController = require("./contollers/userController");

const router = express.Router();

router.post("/invite", storage.single("attachment"), userController.Insert);
router.get("/",userController.getAllPeople);
router.post("/changestatus",userController.changeStatus)

module.exports = router;
