from PIL import Image, ImageDraw, ImageFont

imageSize = (800, 450)
fontSize = 50
textOffset = (25, 25)
backgroundColour = "white"
albumCoverSize = (400, 400)


def generateImage(songName: str, artistName: str, albumName: str):
    img = Image.new('RGB', imageSize, color=backgroundColour)
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("Gotham-Font/GothamMedium.ttf", fontSize)
    d.multiline_text(textOffset, "%s\n%s\n%s" %
                     (songName, artistName, albumName), font=font, fill=(0, 0, 0))
    albumCover = Image.open("testAlbumCover.jpg").resize(albumCoverSize)
    albumOffset = (img.height-albumCover.height)//2
    img.paste(albumCover, (img.width-albumCover.width-albumOffset, albumOffset))
    img.save('outputImage.png')


generateImage("Blade", "Karma", "Anger Management")


def getImage(token: str, layout="compact"):
    pass
