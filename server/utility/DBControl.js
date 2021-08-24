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
		return new Promise((resolve, reject) => {
			// this.#con.connect((err) => {
			// 	if (err) {
			// 		reject(err);
			// 		return;
			// 	}
			// 	this.#con.query(query, (err, result, fields) => {
			// 		if (err) {
			// 			reject(err);
			// 			return;
			// 		}
			// 		resolve(result);
			// 		console.log(result);
			// 	});
			// });
			this.#con.query(query, (err, result, fields) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(result);
				console.log(result);
			});
		});
	};
}
module.exports = DBControl;
