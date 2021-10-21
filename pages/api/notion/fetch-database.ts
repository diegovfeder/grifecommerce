const { Client, APIErrorCode } = require('@notionhq/client');

const notion = new Client({
	auth: process.env.NOTION_INTEGRATION_TOKEN,
});

const fetchDatabase = async () => {
	try {
		const myPage = await notion.databases.query({
			database_id:
				process.env.NOTION_DATABASE_ID || 'd3504580353f4e9abe347a8d445f9c17',
			// filter: {
			// 	property: 'Landmark',
			// 	text: {
			// 		contains: 'Bridge',
			// 	},
			// },
		});
		console.log({ myPage });
		return myPage;
	} catch (error: any) {
		if (error.code === APIErrorCode.ObjectNotFound) {
			//
			// For example: handle by asking the user to select a different database
			//
		} else {
			// Other error handling code
			console.error(error);
		}
	}
};

export default fetchDatabase;
