const { Client } = require('@notionhq/client');

const notion = new Client({
	auth: process.env.NOTION_INTEGRATION_TOKEN,
});

export default async function SubmitForm(
	req: { method: string; body: string },
	res: {
		status: (arg0: number) => {
			(): any;
			new (): any;
			json: { (arg0: { message?: string; msg?: string }): void; new (): any };
		};
	},
) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ message: `${req.method} requests are not allowed` });
	}
	try {
		const { name, email, purpose, message } = JSON.parse(req.body);
		await notion.pages.create({
			parent: {
				database_id: process.env.NOTION_DATABASE_ID,
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: name,
							},
						},
					],
				},
				Email: {
					email: email,
				},
				Purpose: {
					select: {
						name: purpose,
					},
				},
				Message: {
					rich_text: [
						{
							text: {
								content: message,
							},
						},
					],
				},
			},
		});
		res.status(201).json({ msg: 'Success' });
	} catch (error) {
		res.status(500).json({ msg: 'There was an error' });
	}
}
