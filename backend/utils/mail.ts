import 'dotenv/config';
import { createTransport, SentMessageInfo } from 'nodemailer';

const { MAIL_USER, MAIL_PASS, FRONTEND_URL } = process.env;

const transporter = createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: MAIL_USER || 'username',
		pass: MAIL_PASS || 'password',
	},
});

const makeANiceEmail = (text: string): string => {
	return `
		<div style="
			border: 1px solid black;
			padding: 20px;
			font-family: sans-serif;
			line-height: 2;
		  font-size: 20px;"
		>
			<h2> Hello There! </h2>
			<p>${text}</p>
			<p>att, GRIFE</p>
		</div>
	`;
};

const sendPasswordResetEmail = async (
	token: string,
	identity: string,
): Promise<void> => {
	let info: SentMessageInfo = await transporter.sendMail({
		from: '"GRIFE 🦅" <grifemusic@gmail.com>',
		to: identity,
		subject: 'Your password reset token!',
		text: 'Your Password Reset Token is here!',
		html: makeANiceEmail(`Your Password Reset Token is here!
			<a href="${FRONTEND_URL}/reset?token=${token}">Click Here to reset</a>
		`),
	});
	console.log('Message sent: ', JSON.stringify(info, null, 2));
};

export { sendPasswordResetEmail };
