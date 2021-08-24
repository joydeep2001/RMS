const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const users = [];
app.get('/', (req, res) => {
    res.json(users);
});
app.post('/signup', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpass =await  bcrypt.hash(req.body.password, salt);
        const user = {
            id: req.body.id,
            password: hashedpass
        };
        users.push(user);
        res.status(201).send();
    } catch(err) {
        res.status(500).send();
        console.log(err);
    }
    
});
app.post('/login',async (req, res) => {
    
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
app.listen(3001);