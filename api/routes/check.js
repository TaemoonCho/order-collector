import express from "express";
var router = express.Router();

router.get("/", function (req, res, next) {
    res.send("The API server is working properly.");
});

module.exports = router;
