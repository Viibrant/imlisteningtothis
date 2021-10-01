from PIL import Image, ImageDraw, ImageFont

imageSize = (800, 450)
fontSize = 50
textOffset = (10, 10)
backgroundColour = "white"


def generateImage(songName, artistName, albumName):
    img = Image.new('RGB', imageSize, color=backgroundColour)
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("Roboto/Roboto-Light.ttf", fontSize)
    d.multiline_text(textOffset, "%s\n%s\n%s" %
                     (songName, artistName, albumName), font=font, fill=(0, 0, 0))
    img.save('outputImage.png')


generateImage("songName", "artistName", "albumName")


def getImage(token: str, layout="compact"):
    pass
