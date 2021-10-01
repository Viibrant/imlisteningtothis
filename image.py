from PIL import Image, ImageDraw, ImageFont


def generateImage(songName, artistName, albumName):
    img = Image.new('RGB', (800, 450), color='white')
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("Roboto/Roboto-Light.ttf", 75)
    d.multiline_text((10, 10), "%s\n%s\n%s" %
                     (songName, artistName, albumName), font=font, fill=(0, 0, 0))
    img.save('outputImage.png')


generateImage("songName", "artistName", "albumName")


def getImage(token: str, layout="compact"):
    pass
