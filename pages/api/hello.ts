// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	msg: string;
	developedBy: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	res.status(200).json({ msg: 'Hello!', developedBy: 'Diego Feder' });
}
