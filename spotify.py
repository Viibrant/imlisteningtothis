from dotenv import load_dotenv
import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth

load_dotenv()
SPOTIPY_CLIENT_ID = os.environ.get("SPOTIPY_CLIENT_ID")
SPOTIPY_CLIENT_SECRET = os.environ.get("SPOTIPY_CLIENT_SECRET")
SCOPE = "user-read-currently-playing"
SPOTIPY_REDIRECT_URI = "http://localhost:5000/callback"


def verify_user() -> spotipy.Spotify:
    return spotipy.Spotify(
        auth_manager=SpotifyOAuth(
            client_id=SPOTIPY_CLIENT_ID,
            client_secret=SPOTIPY_CLIENT_SECRET,
            scope=SCOPE,
            redirect_uri=SPOTIPY_REDIRECT_URI,
        )
    )


def parse_song(song: dict) -> dict:
    song_name = song["item"]["name"]
    album_name = song["item"]["album"]["name"]
    artists = song["item"]["album"]["artists"]
    album_art = song["item"]["album"]["images"][0]["url"]
    return {
        "song_name": song_name,
        "album_name": album_name,
        "artists": artists,
        "album_art": album_art,
    }


def get_current_track(sp: spotipy.Spotify) -> dict:
    return parse_song(sp.current_user_playing_track())
