from flask import Flask
from flask_restful import Resource, Api
from image import getImage

app = Flask(__name__)
api = Api(app)
class generateImage(Resource):
    def get(self):
        return getImage("foo")

api.add_resource(generateImage, '/')

if __name__ == '__main__':
    app.run(debug=True)