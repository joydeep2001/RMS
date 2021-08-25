const { createConnection } = require("mysql");
require("dotenv").config();

const con = createConnection({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	database: process.env.DBNAME,
});

function doQuery(query) {
	return new Promise((resolve, reject) => {
		con.query(query, (err, result, fields) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
			console.log(result);
		});
	});
}

module.exports = doQuery;
