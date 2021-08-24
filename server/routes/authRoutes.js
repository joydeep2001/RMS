const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const DBController = require("../utility/DBControl");

const { doQuery } = DBController;

const users = [];
router.get("/", (req, res) => {
    res.json(users);
});

router.post("/signup", async (req, res) => {
    const { emailid, password } = req.body;
    const userid = Math.round(Math.random() * 10) * Date.now();
    let hashedpass;
    //creating password hash
    try {
        const salt = await bcrypt.genSalt(10);
        hashedpass = await bcrypt.hash(password, salt);
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
    //inserting data into userlogin table

    doQuery(
        `INSERT INTO userlogin (userid, emailid, password) VALUES ('${userid}', '${emailid}', '${hashedpass}')`
    )
        .then(() =>
            res.status(201).send(`Verification email send to ${emailid}`)
        )
        .catch((err) => {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(400).send("Email id already exists");
                return;
            } else res.status(400).send(err);
            console.log(err.code);
        });
    
});
router.post("/login", async (req, res) => {
    const user = users.find((user) => user.id === req.body.id);
    console.log(user);
    if (!user) {
        return res.status(400).send("User not found");
    }
    try {
        let found = await bcrypt.compare(req.body.password, user.password);
        if (found) {
            res.status(200).send("Login success");
        } else {
            res.status(400).send("Userid password does not match");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

module.exports = router;
