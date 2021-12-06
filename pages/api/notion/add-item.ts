import { Client, LogLevel } from '@notionhq/client';

const notion = new Client({
	auth: process.env.NOTION_INTEGRATION_TOKEN,
	logLevel: LogLevel.DEBUG,
});

const databaseId =
	process.env.NOTION_DATABASE_ID || 'd3504580353f4e9abe347a8d445f9c17';

async function addItem(text: string) {
	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId || '' },
			properties: {
				title: {
					title: [
						{
							text: {
								content: text,
							},
						},
					],
				},
			},
		});
		console.log(response);
		console.log('Success! Entry added.');
	} catch (error: any) {
		console.error({ error } || 'There was an error');
	}
}

addItem('Yurts in Big Sur, California');
