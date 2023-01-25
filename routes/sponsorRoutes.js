const express = require("express");
const router = express.Router();

const sponsorController = require("./../controllers/sponsorController");

router.route("/").
get(sponsorController.getAllSponsors)
.post(sponsorController.createSponsor);

router.route("/:id")
.get(sponsorController.getSponsor)
.patch(sponsorController.updateSponsor)
.delete(sponsorController.deleteSponsor);

module.exports = router;
