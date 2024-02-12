import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null; // Unix timestamp in milliseconds
}

interface SpotifyAuthContextType {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
    logout: () => void;
}

const initialAuthState: AuthState = {
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
};

const SpotifyAuthContext = createContext<SpotifyAuthContextType | undefined>(undefined);

export const useSpotifyAuth = () => {
    const context = useContext(SpotifyAuthContext);
    if (context === undefined) {
        throw new Error('useSpotifyAuth must be used within a SpotifyAuthProvider');
    }
    return context;
};

interface SpotifyAuthProviderProps {
    children: ReactNode;
}

export const SpotifyAuthProvider: React.FC<SpotifyAuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);

    // Function to refresh the access token. Implement this according to your backend setup.
    // This function should request a new access token using the refresh token and update the context.
    const refreshAccessToken = async () => {
        // Placeholder for refresh logic
        // You should replace this with a call to your server or directly to Spotify's API if you're handling it client-side.
        console.log('Refreshing access token...');
        // Example:
        // const newAccessToken = 'new_access_token';
        // const newExpiresAt = Date.now() + 3600 * 1000; // 1 hour from now
        // setAuthState(prev => ({ ...prev, accessToken: newAccessToken, expiresAt: newExpiresAt }));
    };

    // Automatically refresh the access token when it expires
    useEffect(() => {
        if (authState.accessToken && authState.expiresAt) {
            const timeout = authState.expiresAt - Date.now() - 5 * 60 * 1000; // Refresh 5 minutes before expiry
            const timer = setTimeout(refreshAccessToken, timeout);
            return () => clearTimeout(timer);
        }
    }, [authState.accessToken, authState.expiresAt]);

    // Function to handle user logout
    const logout = () => {
        // Clear the auth state and any stored tokens
        setAuthState(initialAuthState);
        localStorage.removeItem('spotify_auth_state'); // Assuming you store the state in local storage
        // Additional cleanup if necessary
    };

    // Persist auth state to local storage or cookies as needed
    useEffect(() => {
        localStorage.setItem('spotify_auth_state', JSON.stringify(authState));
        // Ensure to implement any necessary security measures
    }, [authState]);

    return (
        <SpotifyAuthContext.Provider value={{ authState, setAuthState, logout }}>
            {children}
        </SpotifyAuthContext.Provider>
    );
};
