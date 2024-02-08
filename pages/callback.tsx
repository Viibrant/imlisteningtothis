import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Callback() {
    const router = useRouter();

    useEffect(() => {
        const code = router.query.code as string;
        const codeVerifier = localStorage.getItem('code_verifier');


        if (code && codeVerifier) {
            // Redirect the code to the server
            fetch('/api/exchange_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, codeVerifier }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);

                    // Store the tokens in local storage
                    localStorage.setItem('access_token', data.accessToken);
                    localStorage.setItem('refresh_token', data.refreshToken);

                    //TODO: Handle the response
                    router.push('/');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [router, router.query.code]);

    return <div>Authenticating...</div>;
}
