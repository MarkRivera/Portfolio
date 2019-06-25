const express = require("express");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const sanitize = require("sanitize-html");
const dotenv = require("dotenv");

const app = express(),
	port = 3000,
	path = require("path");

dotenv.config();

let responseMessage = {};

let verifyEmail = userEmail => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)) {
		return userEmail;
	}
	return false;
};

let verifyMessageLength = message => {
	if (message.length > 10) {
		return message;
	} else {
		return false;
	}
};

let sanitizeMessage = message => {
	let clean = sanitize(message);
	return clean;
};

let constructFinalMessage = (message, email) => {
	let finalMessage = ` This message is from: ${email}
		${message}
		`;
	return finalMessage;
};

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/", function(req, res, next) {
	res.send(
		"Science and progress will pave the way for all people's happiness."
	);
});

app.post(
	"/contact",
	function(req, res, next) {
		let email = req.body.contact.email;
		let message = req.body.contact.message;

		let verified = verifyEmail(email);
		let verifiedMessage = verifyMessageLength(message);
		let cleanMessage = sanitizeMessage(message);

		if (verified) {
			responseMessage.email = verified;

			if (verifiedMessage) {
				responseMessage.finalMessage = constructFinalMessage(
					cleanMessage,
					verified
				);
				next();
			} else {
				res.json({
					errorMessage: "Your message is shorter than 10 characters!"
				});
			}
		} else {
			res.json({
				errorMessage: "Please enter a valid email address!"
			});
		}
	},

	function(req, res, next) {
		if (req.body.contact["g-recaptcha-response"]) {
			let transporter = nodeMailer.createTransport({
				service: "gmail",
				auth: {
					user: process.env.EMS,
					pass: process.env.EPS
				}
			});

			let mailOptions = {
				from: `Portfolio <${responseMessage.email}>`, // sender address
				to: "Mark <Mrivera1991@gmail.com>", // list of receivers
				subject: "A message from your portfolio", // Subject line
				text: `${responseMessage.finalMessage}` // plain text body
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					res.json({
						errorMessage: `Something went wrong, please email me at: ${process.env.EMS}`
					});
					return console.log(error);
				}
				console.log("Message %s sent: %s", info.messageId, info.response);
				res.json({ 
					successMessage: "Thank you for your message!",
					status: "200 - OK"
				});
			});
		} else {
			res.json({ errorMessage: "Please verify you're not a bot!" });
		}
	}
);

app.listen(port, () => console.log(`Running on port: ${port}`));
