const { createConnection } = require("mysql");
require("dotenv").config();

class DBControl {
	static #con = createConnection({
		host: process.env.DBHOST,
		user: process.env.DBUSER,
		password: process.env.DBPASSWORD,
		database: process.env.DBNAME,
	});

	static doQuery = (query) => {
		this.#con.connect((err) => {
			if (err) {
				console.log("Error", err);
				return;
			}
			this.#con.query(query, (err, result, fields) => {
				if (err) throw err;
				console.log("Fields: ", fields);
				console.log("Result: ", result);
			});
		});
	};
}
module.exports = DBControl;