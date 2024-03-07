import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null; // Unix timestamp in milliseconds
}

interface SpotifyAuthContextType {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
    isAuth: () => boolean;
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
    // TODO: Add isLoading state, for on mount, and when refreshing token
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);

    const isAuth = () => !!authState.accessToken && !!authState.refreshToken;
    const refreshAccessToken = useCallback(async () => {
        if (!authState.refreshToken) {
            console.error('No refresh token available');
            //TODO: Prompt the user to re-authenticate
            return;
        }

        try {
            const response = await fetch("/api/refresh_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken: authState.refreshToken }),
            });

            const data = await response.json();
            if (data.error) {
                console.error('Error refreshing token:', data.error);
                setAuthState((prev) => ({ ...prev, refreshToken: null, accessToken: null }));
                //TODO: Prompt the user to re-authenticate
                return;
            }

            const { accessToken, refreshToken: newRefreshToken, expiresIn } = data;
            const expiresAtDate = Date.now() + expiresIn * 1000;

            // Update the auth state and local storage
            setAuthState({ accessToken, refreshToken: newRefreshToken, expiresAt: expiresAtDate });
            localStorage.setItem('spotify_auth_state', JSON.stringify({
                accessToken, refreshToken: newRefreshToken, expiresAt: expiresAtDate
            }));

        } catch (error) {
            console.error('Error:', error);
            //? Handle the error as needed
        };
    }, [authState.refreshToken, setAuthState]);


    // Persist auth state to local storage or cookies as needed
    useEffect(() => {
        const storedState = localStorage.getItem('spotify_auth_state');
        console.log('Stored state:', storedState)
        if (storedState) {
            setAuthState(JSON.parse(storedState));
            // Refresh the access token if it's near expiry or already expired
            if (authState.expiresAt && authState.expiresAt < Date.now()) {
                refreshAccessToken();
            }
        }
        else {
            console.log('No stored state found');
        }
    }, [authState.expiresAt, refreshAccessToken]);


    // Automatically refresh the access token when it expires
    useEffect(() => {
        if (authState.accessToken && authState.expiresAt) {
            const timeout = authState.expiresAt - Date.now() - 5 * 60 * 1000; // Refresh 5 minutes before expiry
            const timer = setTimeout(refreshAccessToken, timeout);
            return () => clearTimeout(timer);
        }
    }, [authState.accessToken, authState.expiresAt, refreshAccessToken]);

    // Function to handle user logout
    const logout = () => {
        // Clear the auth state and any stored tokens
        setAuthState(initialAuthState);
        localStorage.removeItem('spotify_auth_state');
    };

    return (
        <SpotifyAuthContext.Provider value={{ authState, setAuthState, isAuth, logout }}>
            {children}
        </SpotifyAuthContext.Provider>
    );
};
