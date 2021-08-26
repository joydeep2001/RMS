const express = require("express");
const router = express.Router();
const { signup, login, verifyemail } = require("../controller/authFunctions");

router.get("/", (req, res) => {
    res.json("<h1>Hello world</h1>");
});

router.post("/signup", signup);

router.post("/login", login);

router.get("/verifyemail/:token", verifyemail);

module.exports = router;
