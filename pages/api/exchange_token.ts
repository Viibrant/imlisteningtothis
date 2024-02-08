import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { code } = req.body;

        //TODO: Implement the token exchange
        console.log("Exchanging code for tokens", code);

        //TODO: Store the tokens in a secure way


        // Send a dummy response for now
        res.status(200).json({ accessToken: 'dummy_access_token', refreshToken: 'dummy_refresh_token' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
