const express = require('express');
const driverController = require('../controllers/driver-controller');

const router = express.Router();

router.post("/add", driverController.insertNewDriver);
router.get("/", driverController.listAllDriver);
router.delete("/delete/:id", driverController.deleteDriver);
router.put("/update", driverController.updateDriver);

module.exports=router;