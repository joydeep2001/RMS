const { createConnection } = require("mysql");

const con = createConnection({
	host: "localhost",
	user: "root",
	password: "Swagato@99",
	database: "rms"
});


con.connect((err) => {
	if(err) console.log("Error", err);
	else {
		con.query("SELECT * FROM user_login", (err, result, fields) => {
			if(err) throw err;
			else {
				console.log("Fields: ", fields);
				console.log("Result: ", result);
			}
		})
	}
});

