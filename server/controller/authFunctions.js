const bcrypt = require("bcrypt");
const doQuery = require("../utility/DBControl");
const sendEmail = require("../utility/mailer");
const {
	generateInsertQuery,
	generateJWT,
	createHash,
} = require("../utility/utils");
const jwt = require("jsonwebtoken");
const { VerifyEmailOpt } = require("../config/emailOptions");

async function signup(req, res) {
	const { emailid, password } = req.body;
	const userid = Math.round(Math.random() * 10) * Date.now();
	let hashedpass = await createHash(password);

	let columnNames = ["userid", "emailid", "password"];
	let values = [userid, emailid, password];

	doQuery(generateInsertQuery("userlogin", columnNames, values))
		.then(async () => {
			const accessToken = generateJWT(userid);
			const mailOption = new VerifyEmailOpt(emaiid, accessToken);
			try {
				let result = await sendEmail(mailOption);
				res.status(200).send(`Verification email send to ${emailid}`);
			} catch (e) {
				res.status(500).send("Pliz retry..");
			}
		})
		.catch((err) => {
			if (err.code === "ER_DUP_ENTRY") {
				res.status(401).send("Email id already exists");
				console.log("Email id already exists");
				return;
			} else res.status(500).send();
			console.log(err.code);
		});
}

async function login(req, res) {
	const { emailid, password } = req.body;
	let result = await doQuery(
		`SELECT * FROM userlogin WHERE emailid='${emailid}'`
	);

	if (!result) {
		return res.status(400).send("User not found");
	}
	if (result[0].activated == 0) {
		return res.status(400).send("Please verify the email account..");
	}

	const hashedpass = result[0].password;
	try {
		let passwordMatched = await bcrypt.compare(password, hashedpass);
		if (passwordMatched) {
			res.status(200).send("Login success");
		} else {
			res.status(401).send("Userid password does not match");
			console.log("Userid password does not match");
		}
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
}

async function verifyemail(req, res) {
	jwt.verify(
		req.params.token,
		process.env.ACCESS_TOKEN_SECRET,
		handleVerification
	);
}

async function handleVerification(err, user) {
	if (err) return res.status(403).send("<h1>Not allowed</h1>");
	console.log(user);
	try {
		let result = await doQuery(
			`UPDATE userlogin set activated=1 WHERE userid=${user}`
		);
		res.redirect("http://localhost:3000");
		res.status(200).send("Success");
	} catch (err) {
		console.log(err);
		res.status(403).send("Forbidden");
	}
}

module.exports = {
	signup,
	login,
	verifyemail,
};
