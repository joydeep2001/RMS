require('dotenv').config({path: '../../.env'});

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');


app.use(express.json());
const posts = [
	{
		username: "Kyle",
		title: "Post 1",
	},
	{
		username: "Joy",
		title: "Post 2",
	},
	{
		username: "Joy",
		title: "Post 3",
	},
];

app.post('/login', (req, res) => {
	const username = req.body.username;
	const user = { name: username };
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	res.json({accessToken: accessToken});
});


app.get('/posts', authorization, (req, res) => {
	let personalPosts = posts.filter((post) => post.username === req.user.name);
	console.log(personalPosts);
	res.json(personalPosts);
});


function authorization(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if(token === null) return res.status(401).send('Invalid token');
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if(err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}


app.listen(3001);