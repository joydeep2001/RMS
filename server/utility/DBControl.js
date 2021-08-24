const { createConnection } = require("mysql");
require("dotenv").config();

export default class DBControl {
	#con = createConnection({
		host: process.env.DBHOST,
		user: process.env.DBUSER,
		password: process.env.DBPASSWORD,
		database: process.env.DBNAME,
	});

	doQuery = (query) => {
		con.connect((err) => {
			if (err) {
				console.log("Error", err);
				return;
			}
			con.query(query, (err, result, fields) => {
				if (err) throw err;
				console.log("Fields: ", fields);
				console.log("Result: ", result);
			});
		});
	};
}
