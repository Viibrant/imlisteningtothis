from PIL import Image, ImageDraw, ImageFont

# Test code
songName = "songName"
artistName = "artistName"
albumName = "albumName"
img = Image.new('RGB', (800, 450), color='white')
d = ImageDraw.Draw(img)
d.text((10, 10), "%s\n%s\n%s" %
       (songName, artistName, albumName), fill=(0, 255, 0), strokeWidth=125)
img.save('outputImage.png')
# /Test code


def getImage(token: str, layout="compact"):
    pass
