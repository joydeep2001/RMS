function VerifyEmailOpt(emailid, accessToken) {
	this.from = "RMS";
	this.to = emailid;
	this.subject = "Verify Your account";
	this.text = `http://localhost:3001/auth/verifyemail/${accessToken}`;
};
console.log(new VerifyEmailOpt('abcd', 'enf'));

module.exports = {
	VerifyEmailOpt
}