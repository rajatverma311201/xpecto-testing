const express = require("express");
const router = express.Router();

const faqController = require("./../controllers/faqController");
router.route("/").get(faqController.getFaqs)
.post(faqController.addFaqs);
router.route("/:id").get(faqController.getOneFaq)
.delete(faqController.deleteFaqs)
.patch(faqController.UpdateFaqs);



module.exports = router;
