import { createTransport } from 'nodemailer';

const transport = createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
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

interface IMailResponse {
	message: string;
}

const sendPasswordResetEmail = async (
	resetToken: string,
	to: string,
): Promise<void> => {
	const info = (await transport.sendMail({
		to,
		from: 'grifemusic@gmail.com',
		subject: 'Your password reset token!',
		html: makeANiceEmail(`Your Password Reset Token is here!
			<a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
		`),
	})) as IMailResponse;
};

export { sendPasswordResetEmail };
