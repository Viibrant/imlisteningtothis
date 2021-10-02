from PIL import Image, ImageDraw, ImageFont
import textwrap
import requests
from io import BytesIO
import base64

image_size = (800, 450)
font_size = 35
text_offset = (25, 25)
background_colour = "white"
album_cover_size = (400, 400)


def generate_image(song_name: str, artist_name: str, album_name: str, album_url: str):
    img = Image.new("RGB", image_size, color=background_colour)
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("Gotham-Font/GothamMedium.ttf", font_size)
    text_to_write = [
        textwrap.wrap(i, width=550 // font_size)
        for i in [song_name, artist_name, album_name]
    ]
    text_to_write = sum(text_to_write, [])
    d.multiline_text(text_offset, "\n".join(text_to_write), font=font, fill=(0, 0, 0))
    response = requests.get(album_url)
    album_cover = Image.open(BytesIO(response.content)).resize(album_cover_size)
    album_offset = (img.height - album_cover.height) // 2
    img.paste(album_cover, (img.width - album_cover.width - album_offset, album_offset))
    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return img_str


generatedImage = generate_image(
    "Song Name",
    "Artist Name",
    "Album Name",
    "https://images-na.ssl-images-amazon.com/images/I/61dGdORObgL._AC_.jpg",
)


def get_image(token: str, layout="compact"):
    pass
