const express = require("express");

const router = express.Router();
const userController=require("../controllers/userController")
const authController = require("./../controllers/authController");

router.route("/login").post(authController.login);
router
    .route("/")
    .get(authController.protect, userController.getOneUser)
    .patch(authController.protect, userController.updateUserDetails);
module.exports = router;