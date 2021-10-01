from PIL import Image, ImageDraw, ImageFont
import textwrap
import requests
from io import BytesIO

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
    img.save('outputImage.png')


generateImage("Song Name", "Artist Name", "Album Name",
              "https://cdns-images.dzcdn.net/images/cover/0275dd13762ef1bc4b680a13b834469c/264x264.jpg")


def getImage(token: str, layout="compact"):
    pass
