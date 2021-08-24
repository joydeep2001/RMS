const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const users = [];
router.get('/', (req, res) => {
    res.json(users);
});

router.post('/signup', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpass =await  bcrypt.hash(req.body.password, salt);
        const user = {
            id: req.body.id,
            password: hashedpass
        };
        users.push(user);
        res.status(201).json(users);
    } catch(err) {
        res.status(500).send();
        console.log(err);
    }
    
});
router.post('/login',async (req, res) => {
    
    const user =  users.find(user => user.id === req.body.id);
    console.log(user);
    if(!user) {
        return res.status(400).send('User not found');
    }
    try {
        let found = await bcrypt.compare(req.body.password, user.password);
        if(found) {
            res.status(200).send("Login success");
        } else {
            res.status(400).send("Userid password does not match");
        }
    
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }

});

module.exports = router;