import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSpotifyAuth } from '@/contexts/SpotifyAuthContext';
export default function Callback() {
    const router = useRouter();
    const { setAuthState } = useSpotifyAuth();

    useEffect(() => {
        const code = router.query.code as string;
        const codeVerifier = localStorage.getItem('code_verifier');

        if (code && codeVerifier) {
            fetch('/api/exchange_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, codeVerifier }),
            })
                .then(response => response.json())
                .then(data => {
                    setAuthState({
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        expiresAt: Date.now() + (data.expiresIn * 1000),
                    });
                    localStorage.setItem("spotify_auth_state", JSON.stringify({
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                        expiresAt: Date.now() + data.expiresIn,
                    }));
                    router.push('/');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [router, setAuthState]);

    return <div>Authenticating...</div>;
}
