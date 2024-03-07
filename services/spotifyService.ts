

const BASE_URL = "https://api.spotify.com/v1";

export const getSpotifyUserProfile = async (accessToken: string) => {
    const response = await fetch(`${BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }
    return response.json();
}
