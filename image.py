from PIL import Image, ImageDraw, ImageFont
import textwrap
import requests
from io import BytesIO
import base64

imageSize = (800, 450)
fontSize = 35
textOffset = (25, 25)
backgroundColour = "white"
albumCoverSize = (400, 400)


def generateImage(songName: str, artistName: str, albumName: str, albumCoverURL: str):
    img = Image.new('RGB', imageSize, color=backgroundColour)
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("Gotham-Font/GothamMedium.ttf", fontSize)
    textToWrite = [textwrap.wrap(i, width=550//fontSize)
                   for i in [songName, artistName, albumName]]
    textToWrite = sum(textToWrite, [])
    d.multiline_text(textOffset, "\n".join(
        textToWrite), font=font, fill=(0, 0, 0))
    response = requests.get(albumCoverURL)
    albumCover = Image.open(BytesIO(response.content)).resize(albumCoverSize)
    albumOffset = (img.height-albumCover.height)//2
    img.paste(albumCover, (img.width-albumCover.width-albumOffset, albumOffset))
    buffered = BytesIO()
    img.save(buffered, format="JPEG")
    imgStr = base64.b64encode(buffered.getvalue())
    return imgStr


generatedImage = generateImage("Song Name", "Artist Name", "Album Name",
                               "https://images-na.ssl-images-amazon.com/images/I/61dGdORObgL._AC_.jpg")


def getImage(token: str, layout="compact"):
    pass
