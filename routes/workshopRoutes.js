const express = require("express");
const router = express.Router();

const workshopController = require("./../controllers/workshopController");

router.get('/', workshopController.getAllWorkshops);
router.post('/', workshopController.createWorkshop);
router.get('/:id', workshopController.getWorkshop);
router.patch('/:id',workshopController.updateWorkshop);
router.delete('/:id', workshopController.deleteWorkshop);


module.exports = router;
