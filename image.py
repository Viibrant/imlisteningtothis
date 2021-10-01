from PIL import Image, ImageDraw, ImageFont

# Test code
songName = "songName"
artistName = "artistName"
albumName = "albumName"
img = Image.new('RGB', (800, 450), color='white')
d = ImageDraw.Draw(img)
font = ImageFont.truetype("Roboto/Roboto-Light.ttf", 75)
d.text((10, 10), "%s\n%s\n%s" %
       (songName, artistName, albumName), fill=(0, 255, 0), stroke_width=0, font=font)
img.save('outputImage.png')
# /Test code


def getImage(token: str, layout="compact"):
    pass
