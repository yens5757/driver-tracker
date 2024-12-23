const express = require('express');
const packageController = require('../controllers/package-controller');

const router = express.Router();

router.post("/add", packageController.insertNewPackage);
router.get("/", packageController.listAllPackage);
router.delete("/delete/:id", packageController.deletePackage);
router.put("/update", packageController.updatePackage);

module.exports=router;