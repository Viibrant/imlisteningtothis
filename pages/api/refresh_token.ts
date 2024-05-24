import { NextApiRequest, NextApiResponse } from 'next';

// Responsible for refreshing the access token
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return res.status(500).json({ error: 'Internal server configuration error' });
    }

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,  // Only used server-side
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.error === 'invalid_grant') {
                // Specific handling for revoked token
                console.error('Refresh token was revoked, prompting re-authentication:', data);
                res.status(401).json({ error: 'Authentication required', details: data.error_description });
                return;
            }
            throw new Error(data.error || 'Failed to refresh token');
        }

        res.status(200).json({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token || refreshToken,  // Keep old refreshToken if not updated
        });
    } catch (error: any) {
        console.error('Error during token refresh:', error);
        res.status(500).json({ error: 'Failed to refresh token', details: error.message });
    }
}
