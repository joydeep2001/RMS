const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const mailOption = {
    from: 'RNS',
    to: 'iimswagato@gmail.com',
    subject: 'Hi its RMS..',
    text: 'randfom!!'
};
transporter.sendMail(mailOption, (err, data)=> {
    if(err) {
        console.log("Error", err);
    } else {
        console.log(data);
    }
})