from flask import Flask
from flask_restful import Resource, Api
from image import get_image
import spotify

app = Flask(__name__)
api = Api(app)


@app.route("/")
def index():
    # TODO: add relevant calls to spotify.py
    pass


if __name__ == "__main__":
    app.run(debug=True)
