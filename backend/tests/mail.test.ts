import { createTransport } from 'nodemailer';
import { sendPasswordResetEmail } from '../utils/mail';

jest.mock('nodemailer');

describe('sendPasswordResetEmail', () => {
	it('sends an email with a password reset link', async () => {
		const token = 'abc123';
		const identity = 'user@example.com';
		const frontendUrl = 'http://localhost:3000';
		process.env.FRONTEND_URL = frontendUrl;

		const sendMail = jest.fn().mockResolvedValue({});
		(createTransport as jest.Mock).mockReturnValue({ sendMail });

		await sendPasswordResetEmail(token, identity);

		expect(sendMail).toHaveBeenCalledWith({
			from: '"GRIFE 🦅" <grifemusic@gmail.com>',
			to: identity,
			subject: 'Your password reset token!',
			text: 'Your Password Reset Token is here!',
			html: expect.stringContaining(
				`<a href="${frontendUrl}/reset?token=${token}">Click Here to reset</a>`,
			),
		});
	});
});
