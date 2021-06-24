import express from "express";
import { getOrders } from "../controllers/getOrdersFromImweb";
const router = express.Router();

// Get order from Imweb
router.get("/", getOrders);

// push order to Ecount
router.post("/", function (req, res, next) {
    res.send("API is working properly");
});

module.exports = router;
