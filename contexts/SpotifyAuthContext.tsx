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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const isAuth = () => !!authState.accessToken && !!authState.refreshToken;
    const refreshAccessToken = useCallback(async () => {

        // Check if refresh token exists...
        if (!authState.refreshToken) {
            console.error('No refresh token available');
            setError("No refresh token available")
            //TODO: Prompt the user to re-authenticate
            return;
        }

        setIsLoading(true);

        // Refresh the access token
        try {
            const response = await fetch("/api/refresh_token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken: authState.refreshToken }),
            });

            const data = await response.json();

            // Catch errors from the server
            if (!response.ok) {
                throw new Error(data.error || "Unknown error");
            }

            // Update the auth state with the new tokens
            const { accessToken, refreshToken: newRefreshToken, expiresIn } = data;
            const expiresAtDate = Date.now() + expiresIn * 1000;

            // Set the new tokens in state and local storage
            setAuthState({ accessToken, refreshToken: newRefreshToken, expiresAt: expiresAtDate });
            localStorage.setItem('spotify_auth_state', JSON.stringify({
                accessToken, refreshToken: newRefreshToken, expiresAt: expiresAtDate
            }));

        } catch (error: any) {
            console.error('Error during token refresh:', error);
            setError(error.message);
            // Catch expired refresh token and prompt re-authentication
            if (error.message === "invalid_grant") {
                setAuthState(initialAuthState);
                localStorage.removeItem('spotify_auth_state');
            }
        } finally {
            // Always set loading to false
            setIsLoading(false);
        };
    }, [authState.refreshToken, setAuthState]);


    useEffect(() => {
        // Load auth state from local storage
        const storedState = localStorage.getItem('spotify_auth_state');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            console.log('Stored state:', storedState);
            setAuthState(parsedState);
        } else {
            console.log('No stored state found');
        }

        // Function to check if the access token is close to expiry and refresh it if needed
        const manageTokenRefresh = () => {
            if (authState.accessToken && authState.expiresAt && authState.expiresAt < Date.now() + 5 * 60 * 1000) {
                refreshAccessToken();
            }
        };
        manageTokenRefresh();

        // Set up an interval to check token expiry periodically
        const interval = setInterval(manageTokenRefresh, 5 * 60 * 1000); // Check every 5 minutes

        // Clean up the interval for unmounting or when auth state changes
        return () => clearInterval(interval);
    }, [authState.expiresAt, authState.accessToken, refreshAccessToken]);

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
