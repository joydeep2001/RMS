const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const mailOption = {
    from: "RNS",
    to: "pkb195929@gmail.com",
    subject: "Hi its RMS..",
    text: "randfom!!",
};
function sendEmail(mailOption) {
    transporter.sendMail(mailOption, (err, data) => {
        if (err) {
            throw error;
        } else {
            console.log(data);
        }
    });
}

module.exports = sendEmail;