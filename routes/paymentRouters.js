const router =require("express").Router();
const paymentController=require("../controllers/paymentController");

router.route("/orders").post(paymentController.paymentorders);
router.route("/verify").post(paymentController.paymentverify);

module.exports = router;
