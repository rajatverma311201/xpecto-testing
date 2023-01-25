const express = require("express");
const router = express.Router();

const keytalkController = require("./../controllers/keytalkController");

router.route("/").get(keytalkController.getAllKeytalks).post(
  // authController.protect,
  // authController.restrictTo('admin'),
  keytalkController.createKeytalk
);

router.route("/:id").get(keytalkController.getKeytalk)
  .patch(
//     // authController.protect,
//     // authController.restrictTo('admin'),
    keytalkController.updateKeytalk
  )
  .delete(
//     // authController.protect,
//     // authController.restrictTo('admin'),
    keytalkController.deleteKeytalk
  );
  
module.exports = router;
