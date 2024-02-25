import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { refreshToken } = req.body;

        // Check for environment variables
        const clientId = process.env.SPOTIFY_CLIENT_ID; // Use non-public env var for sensitive data
        const clientSecret = process.env.SPOTIFY_CLIENT_SECRET; // This should be securely stored and not exposed

        if (!clientId || !clientSecret) {
            console.error('Server environment variables are not set');
            return res.status(500).json({ error: 'Internal server configuration error' });
        }

        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);
        params.append('client_id', clientId);
        // Client secret is required for refreshing the token securely
        params.append('client_secret', clientSecret);

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            const data = await response.json();

            if (data.error) {
                console.error('Error refreshing token:', data.error);
                return res.status(data.error === 'invalid_grant' ? 400 : 401).json({ error: data.error });
            }

            // On success, send back the new access token and its expiry time
            res.status(200).json({
                accessToken: data.access_token,
                expiresIn: data.expires_in, // Consider sending expiresIn to the client for managing token refresh timing
                // refreshToken: data.refresh_token, // Usually, the refresh token is not changed. Only send if you receive a new one.
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
