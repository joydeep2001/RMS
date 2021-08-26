const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function createHash(password) {
	return new Promise(async (resolve, reject) => {
		try {
			const salt = await bcrypt.genSalt(10);
			hashedpass = await bcrypt.hash(password, salt);
			resolve(hashedpass);
		} catch (err) {
			reject(err);
		}
	});
}

function generateJWT(userid) {
	return jwt.sign(userid, process.env.ACCESS_TOKEN_SECRET);
}

function inserQueryHelper(arr, values=true) {
	let str = '(';
	arr.forEach((el, i) => {
		if(i != 0) str += ',';
		if(typeof(el) === 'string' && values) str += `'${el}'`;
		else str += el;
	});
	str += ')';
	return str;
}
function generateInsertQuery(tableName, columnNames, values) {
	
	let colStr = inserQueryHelper(columnNames, false);
	let valueStr = inserQueryHelper(values);
	let insertQuery = `INSERT INTO ${tableName} ${colStr} VALUES ${valueStr}`;
	console.log(insertQuery);
	return insertQuery;
	
}

function generateUserId() {
	return Math.round(Math.random() * 10) * Date.now();
}

module.exports = {
	createHash,
	generateInsertQuery,
	generateJWT,
	generateUserId

}