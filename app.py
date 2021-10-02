from flask import Flask
from flask_restful import Resource, Api
from image import get_image

app = Flask(__name__)
api = Api(app)


class generate_image(Resource):
    def get(self):
        return get_image("foo")


api.add_resource(generate_image, "/")

if __name__ == "__main__":
    app.run(debug=True)
