import type { AppProps } from 'next/app';
import { SpotifyAuthProvider } from '../contexts/SpotifyAuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SpotifyAuthProvider>
            <Component {...pageProps} />
        </SpotifyAuthProvider>
    );
}

export default MyApp;