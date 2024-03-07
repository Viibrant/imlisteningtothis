import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { code, codeVerifier } = req.body;

        //? There might be a chance that these environment variables are not set
        //? If that's the case, the server will throw an error
        //? Might be a better way to handle this
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
        const redirectUri = process.env.REDIRECT_URI!;


        // Prepare the request for token exchange
        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', redirectUri);
        params.append('code_verifier', codeVerifier);


        // Make the token exchange request to Spotify
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            const data = await response.json();

            // Handle the response from Spotify
            if (data.error) {
                console.error('Error exchanging token:', data.error);
                return res.status(401).json({ error: data.error });
            }

            // On success, send back the tokens to the client or handle them as needed
            res.status(200).json({ accessToken: data.access_token, refreshToken: data.refresh_token, expiresIn: data.expires_in });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        // If the request is not POST, indicate the allowed method
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
