const express = require("express");
const router = express.Router();
const control = require("./controller.js");
const { verifyToken } = require("../middleware/auth.js");

router.post("/verifyLoginDetails", control.verifyLoginDetails);

router.post("/createUser", control.createUser);

router.get("/getItemsDetails", control.getItemsDetails);

router.post("/submitOrder", verifyToken, control.submitOrder);
// router.post("/submitOrder", control.submitOrder);

router.get("/getOrderedItemsData", verifyToken, control.getOrderedItemsData);
// router.get("/getOrderedItemsData", control.getOrderedItemsData);

module.exports = router;
