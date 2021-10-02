from PIL import Image, ImageDraw, ImageFont
import textwrap
import requests
from io import BytesIO
import base64

image_size = (800, 450)
font_size = 35
text_offset = [25, 25]
background_colour = "white"
album_cover_size = (400, 400)
fonts = [
    ImageFont.truetype("Gotham-Font/GothamLight.ttf", font_size),
    ImageFont.truetype("Gotham-Font/GothamMedium.ttf", font_size),
    ImageFont.truetype("Gotham-Font/GothamLightItalic.ttf", font_size),
]


def wrap_text(text_to_wrap):
    wrapped_text = textwrap.wrap(text_to_wrap, width=550 // font_size)
    return wrapped_text


def generate_image(song_name: str, artist_name: str, album_name: str, album_url: str):
    img = Image.new("RGB", image_size, color=background_colour)
    d = ImageDraw.Draw(img)
    text_to_write = [wrap_text(i) for i in [song_name, artist_name, album_name]]
    new_line_offset = text_offset
    for i, e in enumerate(text_to_write):
        for j in e:
            d.text(new_line_offset, j, font=fonts[i], fill=(25, 20, 20))
            new_line_offset[1] += d.textsize(j, font=fonts[i])[1] + 10
        new_line_offset[1] += 25

    response = requests.get(album_url)
    album_cover = Image.open(BytesIO(response.content)).resize(album_cover_size)
    album_offset = (img.height - album_cover.height) // 2
    img.paste(album_cover, (img.width - album_cover.width - album_offset, album_offset))
    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    # Save image for testing purposes
    img.save("OutputImage.png")
    return img_str


generatedImage = generate_image(
    "Gravesinger",
    "Melancholy",
    "Shadow of Intent",
    "https://i.scdn.co/image/ab67616d0000b273c9952398fc889410543f27f8",
)


def get_image(token: str, layout="compact"):
    pass
