import React from 'react';
import { useSpotifyAuth } from '@/contexts/SpotifyAuthContext';

export default function Signout() {
    const { logout } = useSpotifyAuth();

    const handleLogout = () => {
        logout();
        //? Any extra stuff to do on logout?
    };

    return (
        <button onClick={handleLogout}>
            Sign Out
        </button>
    );
};
